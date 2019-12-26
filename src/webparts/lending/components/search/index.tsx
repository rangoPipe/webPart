import React from "react";
import { connect } from "react-redux";
import { subspace, Subspace } from "redux-subspace";

import Page from "./page";
import { contentStyles, iconButtonStyles } from "../../../../common/classes/style";
import store from "../../../../redux/store";

import { ISearchProps, ISearchState, SectionVisibleEnum, IdDropdownsEnum } from "./ISearchProps";
import { IIOIPStore } from "../../../../redux/namespace";
import { IButtonProps, ButtonStyle } from "../../../../redux/reducers/general/button/IButtonProps";
import { IChoiceGroupProps } from "../../../../redux/reducers/general/choiceGroup/IChoiceGroupProps";
import { IChoiceGroupOptionProps, createTheme, IColumn, IDropdownOption, Selection, SelectionMode, IModalProps, IconButton, Stack } from "office-ui-fabric-react";
import { IDropdownProps } from "../../../../redux/reducers/general/dropdown/IDropdownProps";
import { IDetailListProps } from "../../../../redux/reducers/general/detailList/IDetailListProps";

import { BaseService } from "../../../../common/classes/baseService";
import { LendingResultFilter, LendingFilter, LendingResultDTO, LendingDTO } from "../../../../interface/lending/lendingResult";
import { apiTransferencia } from "../../../../common/connectionString";
import { createDetailList, loadDetailList, selectRowItem  } from "../../../../redux/actions/general/detailList/_actionName";
import { createDropdown, loadOptions } from "../../../../redux/actions/general/dropdown/_actionName";

import { LendingNameSpace } from "../../../../enum/lending/lendingEnum";
import { createButton, hideButton } from "../../../../redux/actions/general/button/_actionName";
import { createModal, createContent } from "../../../../redux/actions/general/modal/_actionName";

import { TextFieldGeneral as Textfield } from "../../../../general/textField";

class SearchClass extends React.Component<ISearchProps, ISearchState> {

  private _detailListController:Subspace<IDetailListProps, any, IIOIPStore> = subspace((state: IIOIPStore) => state.detailListSearch, LendingNameSpace.detailListSearch )(store);
  private _dropDownSectionController:Subspace<IDropdownProps, any, IIOIPStore> = subspace((state: IIOIPStore) => state.dropDownSectionSearch, LendingNameSpace.dropDownSectionSearch )(store);
  private _dropDownSubsectionController:Subspace<IDropdownProps, any, IIOIPStore> = subspace((state: IIOIPStore) => state.dropDownSubsectionSearch, LendingNameSpace.dropDownSubsectionSearch )(store);
  private _dropDownSerieController:Subspace<IDropdownProps, any, IIOIPStore> = subspace((state: IIOIPStore) => state.dropDownSerieSearch, LendingNameSpace.dropDownSerieSearch )(store);
  private _dropDownSubserieController:Subspace<IDropdownProps, any, IIOIPStore> = subspace((state: IIOIPStore) => state.dropDownSubserieSearch, LendingNameSpace.dropDownSubserieSearch )(store);
  
  private _buttonSearchController:Subspace<IButtonProps, any, IIOIPStore> = subspace((state: IIOIPStore) => state.buttonSearchSearch, LendingNameSpace.buttonSearchSearch )(store);
  private _buttonCancelController:Subspace<IButtonProps, any, IIOIPStore> = subspace((state: IIOIPStore) => state.buttonCancelSearch, LendingNameSpace.buttonCancelSearch )(store);
  private _buttonLendController:Subspace<IButtonProps, any, IIOIPStore> = subspace((state: IIOIPStore) => state.buttonLendSearch, LendingNameSpace.buttonLendSearch )(store);

  private _modalController:Subspace<IModalProps, any, IIOIPStore> = subspace((state: IIOIPStore) => state.modalSearch, LendingNameSpace.modalSearch )(store);

  private _choiceGroup: IChoiceGroupProps;

  private _lendingFilter: LendingFilter = {};

  private _http: BaseService = new BaseService();
  private _selection: Selection;

  constructor(props: ISearchProps) {
    super(props); 
    
    this.state = {
      sectionVisible: SectionVisibleEnum.Record,
      resultVisible: false,
      modalVisible: false,

      noRecord: null,
      titleRecord: null,
      noFiled: null,
      subjectFiled: null,
      noTypeDocumental: null,
      titleTypeDocumental: null
    };   

    this._selection = new Selection({
      onSelectionChanged: () => {
        this._detailListController.dispatch({ type: selectRowItem, payload: this._selection.getSelection() });
        this._buttonLendController.dispatch({ type: hideButton, payload: !(this._selection.getSelectedCount() > 0 ) });       
      }
    });

    
    this._detailListController.dispatch({ type: createDetailList, payload: {
      columns: this._createColumns(),
      selection: this._selection,
      selectionMode: SelectionMode.single
    }});

    this._createButtons();
    this._createChoices();
    this._createDropdowns();
    this._createModal();
  }

  componentDidMount() {
    this._loadDropdown();
  }

  componentDidUpdate() {
    if (this.state.resultVisible ){      
      window.scrollTo(0, document.body.scrollHeight);
    }
  }

  private _createButtons() {

    this._buttonSearchController.dispatch({ type: createButton, payload: {
      buttonStyle: ButtonStyle.PrimaryButton,
      text: "Buscar",
      primary: true,
      iconProps: {
        iconName: "Search"
      },
      onClick: e => {
        this._loadPendings();
      }
    }});

    this._buttonLendController.dispatch({ type: createButton, payload: {
      buttonStyle: ButtonStyle.PrimaryButton,
      text: "Solicitar Prestamo",
      primary: true,
      hidden: true,
      iconProps: {
        iconName: "PageHeaderEdit"
      },
      onClick: e => {
        this.setState({
          ...this.state,
          modalVisible: true
        });

        const item:LendingDTO = this._detailListController.getState().selectedItems[0];

        const content:JSX.Element = (
          <Stack>
            <div className="ms-Grid ms-depth-8 container">
              <div className="ms-Grid-row body">
                <div className="ms-Grid-col ms-sm10 ms-md10 ms-lg10 ms-smPush1">
                  <div className="ms-Grid">
                    <div className="ms-Grid-row section">
                      <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6">
                        Número de expediente:
                        <Textfield textField={{ value : item.nroExpediente , disabled : true }} />                   
                      </div>
                      <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6">
                        Titulo de expediente:
                        <Textfield textField={{ value : item.nombre_expediente , disabled : true }} />
                      </div>
                      <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6">
                        Subsección:
                        <Textfield textField={{ value : item.nombre_subseccion, disabled : true }} />
                      </div>
                      <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6">
                        Serie:
                        <Textfield textField={{ value : item.nombre_serie , disabled : true }} />
                      </div>
                      <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6">
                        Subserie:
                        <Textfield textField={{ value : "subserie", disabled : true }} />
                      </div>
                      <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg12">
                        Observaciones solicitud:
                        <Textfield textField={{ value : "subserie", multiline :true, rows : 5 }} />
                      </div>
                    </div>
                    </div>
                  </div>
                </div>
              </div>
            </Stack>
        );
        this._modalController.dispatch({ type :createContent, payload: content });
      }
    }});

    this._buttonCancelController.dispatch({ type: createButton, payload: {
      text: "Cancelar",
      onClick: e => {
        
        this.setState({
          ...this.state,
          resultVisible: false,
          modalVisible: true
        });
        this._buttonLendController.dispatch({ type: hideButton, payload: true });   
      }
    }});   
  }

  private _createChoices() {
    const options: IChoiceGroupOptionProps[] = [
      {
        key: "filed",
        iconProps: { iconName: "ComplianceAudit" },
        text: "Radicado",
        onClick: e => {
          this.setState({
            ...this.state,
            sectionVisible: SectionVisibleEnum.Filed,
            noRecord: null,
            titleRecord: null,
            noTypeDocumental: null,
            titleTypeDocumental: null,
            resultVisible: false
          });
        }
      },
      {
        key: "record",
        iconProps: { iconName: "FileRequest" },
        text: "Expediente",
        onClick: e => {
          this.setState({
            ...this.state,
            sectionVisible: SectionVisibleEnum.Record,
            noFiled: null,
            subjectFiled: null,
            noTypeDocumental: null,
            titleTypeDocumental: null,
            resultVisible: false
          });
        },
        theme: createTheme({
          fonts: {
            medium: {
              fontFamily: "Monaco, Menlo, Consolas",
              fontSize: "11px"
            }
          }
        })
      },
      {
        key: "documentalType",
        iconProps: { iconName: "ThumbnailView" },
        text: "Tipo Documental",
        onClick: e => {
          this.setState({
            ...this.state,
            sectionVisible: SectionVisibleEnum.DocumentalType,
            noRecord: null,
            titleRecord: null,
            noFiled: null,
            subjectFiled: null,
            resultVisible: false
          });
        },
        theme: createTheme({
          fonts: {
            medium: {
              fontFamily: "Monaco, Menlo, Consolas",
              fontSize: "11px"
            }
          }
        })
      }
    ];

    this._choiceGroup = {
      options,
      defaultSelectedKey: "record"
    };
  }

  private _createDropdowns() {

    this._dropDownSectionController.dispatch({ type: createDropdown, payload: {
      id: IdDropdownsEnum.ddlSection.toString(),
      placeholder: "Seleccione una Sección",
      
      onChange: (e:React.FormEvent, o:IDropdownOption) => {
        this._lendingFilter.idSeccion = o.key;
        this._loadDropdown();
      }
    }});

    this._dropDownSubsectionController.dispatch({ type: createDropdown, payload: {
      id: IdDropdownsEnum.ddlSubsection.toString(),
      placeholder: "Seleccione una Subsección",
      onChange: (e:React.FormEvent, o:IDropdownOption) => {
        this._lendingFilter.idSubseccion = o.key;
      }
    }});

    this._dropDownSerieController.dispatch({ type: createDropdown, payload: {
      id: IdDropdownsEnum.ddlSerie.toString(),
      placeholder: "Seleccione una Serie",
      onChange: (e:React.FormEvent, o:IDropdownOption) => {
        this._lendingFilter.idSerie = o.key;
        this._loadDropdown();
      }
    }});

    this._dropDownSubserieController.dispatch({ type: createDropdown, payload: {
      id: IdDropdownsEnum.ddlSubserie.toString(),
      placeholder: "Seleccione una Subserie",
      onChange: (e:React.FormEvent, o:IDropdownOption) => {
        this._lendingFilter.idSubserie = o.key;
      }
    }});
  }

  private _createModal() {

    const header:JSX.Element = (
      <div className = { contentStyles.header } >
        <span>Solicitar Prestamo</span>
        <IconButton
          styles = { iconButtonStyles }
          iconProps={{ iconName: 'Cancel' }}
          ariaLabel="Close popup modal"
          onClick={ () => {
            this.setState({...this.state, modalVisible: false });
          }}
        />
      </div>);

    this._modalController.dispatch({ type: createModal, payload: {
      header,
      isOpen: true,
      onDismiss : () => {
        this.setState({...this.state, modalVisible: false });
      }
    }});
  }

  private _createColumns = (): IColumn[] => {
    return [
      {
        key: "nroExpediente",
        name: "No. Expediente",
        fieldName: "nroExpediente",
        isRowHeader: true,
        isSorted: true,
        isSortedDescending: false,
        sortAscendingAriaLabel: "Sorted A to Z",
        sortDescendingAriaLabel: "Sorted Z to A",
        data: "string",
        minWidth: 100,
        maxWidth: 150,
        onRender: (item: LendingDTO) => {
          return <span>{item.nroExpediente}</span>;
        }
      },
      {
        key: "nroRadicado",
        name: "No. Radicado",
        fieldName: "nroRadicado",
        isRowHeader: true,
        isSorted: true,
        isSortedDescending: false,
        sortAscendingAriaLabel: "Sorted A to Z",
        sortDescendingAriaLabel: "Sorted Z to A",
        data: "string",
        minWidth: 100,
        maxWidth: 150,
        onRender: (item: LendingDTO) => {
          return <span>{item.nroRadicado}</span>;
        }
      },
      {
        key: "nombre_expediente",
        name: "Titulo Expediente",
        fieldName: "nombre_expediente",
        isResizable: true,
        data: "string",
        minWidth: 100,
        maxWidth: 150,
        onRender: (item: LendingDTO) => {
          return <span>{item.nombre_expediente}</span>;
        }
      },
      {
        key: "nombre_seccion",
        name: "Sección",
        fieldName: "nombre_seccion",
        isResizable: true,
        data: "string",
        minWidth: 100,
        onRender: (item: LendingDTO) => {
          return <span>{item.nombre_seccion}</span>;
        }
      },
      {
        key: "nombre_subseccion",
        name: "Subsección",
        fieldName: "nombre_subseccion",
        isResizable: true,
        data: "string",
        minWidth: 100,
        onRender: (item: LendingDTO) => {
          return <span>{item.nombre_subseccion}</span>;
        }
      },
      {
        key: "nombre_serie",
        name: "Serie",
        fieldName: "nombre_serie",
        isResizable: true,
        data: "string",
        minWidth: 100,
        onRender: (item: LendingDTO) => {
          return <span>{item.nombre_serie}</span>;
        }
      }
    ];
  };

  private _loadDropdown = () => {
    
    this._http.FetchPost(`${apiTransferencia}/Api/Lending/Filters`, this._lendingFilter)
      .then((_response:LendingResultFilter) => {
        if(_response) {          
          if(_response.success) {

            this._dropDownSectionController.dispatch({ 
              type: loadOptions, 
              payload: _response.result.section.map((x:any) => {
                return { key:x.idSeccion, text: x.nombre }
              })
            });
        
            this._dropDownSubsectionController.dispatch({ 
              type: loadOptions, 
              payload: _response.result.subsection.map((x:any) => {
                return { key:x.idSeccion, text: x.nombre }
              })
            });
        
            this._dropDownSerieController.dispatch({ 
              type: loadOptions, 
              payload: _response.result.serie.map((x:any) => {
                return { key:x.idSerie, text: x.nombre }
              })
            });
        
            this._dropDownSubserieController.dispatch({ 
              type: loadOptions, 
              payload: _response.result.subserie.map((x:any) => {
                return { key:x.idSubserie, text: x.nombre }
              })
            });
          } 
        }                   
      })
      .catch(err => {
        console.log(err);        
      });
  }

  private _loadPendings = () => {
    this._http.FetchPost(`${apiTransferencia}/Api/Lending/Lendings`, this._lendingFilter)
      .then((_response:LendingResultDTO) => {
        if(_response.success) {        
          
          this._detailListController.dispatch({ type: loadDetailList, payload: _response.result });

          this.setState({
            ...this.state,
            resultVisible: true
          });
        }                           
      })
      .catch(err => {
        console.log(err);        
      });
  }

  public render(): JSX.Element {
    return (
      <Page
        sectionVisible = { this.state.sectionVisible }
        resultVisible = { this.state.resultVisible }
        modalVisible = { this.state.modalVisible }
        choiceGroup = { this._choiceGroup }
      />
    );
  }
}

const mapStateToProps = (state: IIOIPStore) => {
    return {
    };
  };
  
  /**
   * Conecta el componente con el store de Redux
   * @param {function} mapStateToProps https://react-redux.js.org/api/connect#mapdispatchtoprops-object-dispatch-ownprops-object
   */
  export default connect(mapStateToProps)(SearchClass);
  