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
import { IChoiceGroupOptionProps, createTheme, IColumn, IDropdownOption, Selection, SelectionMode, IModalProps, IconButton, ITextFieldProps, IMessageBarProps, MessageBarType } from "office-ui-fabric-react";
import { IDropdownProps } from "../../../../redux/reducers/general/dropdown/IDropdownProps";
import { IDetailListProps } from "../../../../redux/reducers/general/detailList/IDetailListProps";

import { BaseService } from "../../../../common/classes/baseService";
import { LendingResult, LendingFilter, LendingResultDTO, LendingDTO } from "../../../../interface/lending/lendingResult";
import { apiTransferencia } from "../../../../common/connectionString";


import { SearchNameSpace } from "../../../../enum/lending/lendingEnum";
import { createDetailList, loadDetailList, selectRowItem  } from "../../../../redux/actions/general/detailList/_actionName";
import { createDropdown, loadOptions } from "../../../../redux/actions/general/dropdown/_actionName";
import { createButton, hideButton } from "../../../../redux/actions/general/button/_actionName";
import { createModal, createContent } from "../../../../redux/actions/general/modal/_actionName";
import { createTextField, changeTextField } from "../../../../redux/actions/general/textField/_actionName";
import { hideMessageBar } from "../../../../redux/actions/general/messageBar/_actionName";

import Content from "./contentModal";

class SearchClass extends React.Component<ISearchProps, ISearchState> {

  private _detailListController:Subspace<IDetailListProps, any, IIOIPStore> = subspace((state: IIOIPStore) => state.detailListSearch, SearchNameSpace.detailListSearch )(store);
  private _dropDownSectionController:Subspace<IDropdownProps, any, IIOIPStore> = subspace((state: IIOIPStore) => state.dropDownSectionSearch, SearchNameSpace.dropDownSectionSearch )(store);
  private _dropDownSubsectionController:Subspace<IDropdownProps, any, IIOIPStore> = subspace((state: IIOIPStore) => state.dropDownSubsectionSearch, SearchNameSpace.dropDownSubsectionSearch )(store);
  private _dropDownSerieController:Subspace<IDropdownProps, any, IIOIPStore> = subspace((state: IIOIPStore) => state.dropDownSerieSearch, SearchNameSpace.dropDownSerieSearch )(store);
  private _dropDownSubserieController:Subspace<IDropdownProps, any, IIOIPStore> = subspace((state: IIOIPStore) => state.dropDownSubserieSearch, SearchNameSpace.dropDownSubserieSearch )(store);
  
  private _buttonSearchController:Subspace<IButtonProps, any, IIOIPStore> = subspace((state: IIOIPStore) => state.buttonSearchSearch, SearchNameSpace.buttonSearchSearch )(store);
  private _buttonCancelController:Subspace<IButtonProps, any, IIOIPStore> = subspace((state: IIOIPStore) => state.buttonCancelSearch, SearchNameSpace.buttonCancelSearch )(store);
  private _buttonLendController:Subspace<IButtonProps, any, IIOIPStore> = subspace((state: IIOIPStore) => state.buttonLendSearch, SearchNameSpace.buttonLendSearch )(store);

  private _modalController:Subspace<IModalProps, any, IIOIPStore> = subspace((state: IIOIPStore) => state.modalSearch, SearchNameSpace.modalSearch )(store);
  private _textAreaController:Subspace<ITextFieldProps, any, IIOIPStore> = subspace((state: IIOIPStore) => state.textAreaSearch, SearchNameSpace.textAreaSearch )(store);
  private _messageBarController:Subspace<IMessageBarProps, any, IIOIPStore> = subspace((state: IIOIPStore) => state.messageBarSearch, SearchNameSpace.messageBarSearch )(store);

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

    this._textAreaController.dispatch({ type: createTextField, payload: {
      multiline: true,
      label: "Observaciones solicitud",
      rows: 5,
      onChange: (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
        this._textAreaController.dispatch({ type:changeTextField, payload: newValue});
      }
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
      onClick: () => {
        this.setState({
          ...this.state,
          modalVisible: true
        });

        const item:LendingDTO = this._detailListController.getState().selectedItems[0];
        this._hideMessage(true);

        this._textAreaController.dispatch({type: changeTextField, payload:""});

        this._modalController.dispatch({ 
          type :createContent,
           payload: 
            <Content item = { item } 
              onCancel = { () => this._closeModal() } 
              onAccept = { () => this._sendRequest(item) }
              /> 
          });
      }
    }});

    this._buttonCancelController.dispatch({ type: createButton, payload: {
      text: "Cancelar",
      onClick: () => {

        this._selection.setAllSelected(false);
        this._buttonLendController.dispatch({ type: hideButton, payload: true }); 
        this._closeModal({ resultVisible: false });  
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
      label:"Sección:",
      onChange: (e:React.FormEvent, o:IDropdownOption) => {
        this._lendingFilter.idSeccion = o.key;
        this._loadDropdown();
      }
    }});

    this._dropDownSubsectionController.dispatch({ type: createDropdown, payload: {
      id: IdDropdownsEnum.ddlSubsection.toString(),
      placeholder: "Seleccione una Subsección",
      label:"Subsección:",
      onChange: (e:React.FormEvent, o:IDropdownOption) => {
        this._lendingFilter.idSubseccion = o.key;
      }
    }});

    this._dropDownSerieController.dispatch({ type: createDropdown, payload: {
      id: IdDropdownsEnum.ddlSerie.toString(),
      placeholder: "Seleccione una Serie",
      label:"Serie:",
      onChange: (e:React.FormEvent, o:IDropdownOption) => {
        this._lendingFilter.idSerie = o.key;
        this._loadDropdown();
      }
    }});

    this._dropDownSubserieController.dispatch({ type: createDropdown, payload: {
      id: IdDropdownsEnum.ddlSubserie.toString(),
      placeholder: "Seleccione una Subserie",
      label:"Subserie:",
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
          onClick={ () => this._closeModal() }
        />
      </div>);

    this._modalController.dispatch({ type: createModal, payload: {
      header,
      isOpen: true,
      onDismiss : () => this._closeModal()
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
      .then((_response:LendingResult) => {
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

  private _closeModal = (properties = {}) => {
    this.setState({
      ...this.state,
      ...properties,
      modalVisible: false
    });
  }

  private _hideMessage =  ( showMessage, message = "", messageBarType = MessageBarType.error) => {
    this._messageBarController.dispatch({ type: hideMessageBar, payload : {
      messageBarType,
      isMultiline: false,
      value: message,
      hideMessage: showMessage
    }});
  }

  private _sendRequest = (item:LendingDTO) => {

    const observacion:string = this._textAreaController.getState().value;

    if(!observacion || observacion.length === 0) {
      this._hideMessage(false, "El campo observaciones no puede estar vacio");
    }
    else {      
      this._hideMessage(true);
      const requestLend: LendingDTO = {
        ...item, observacion 
      }
      this._hideMessage(false, "Solicitando...", MessageBarType.warning );
      this._http.FetchPost(`${apiTransferencia}/Api/Lending/RequestLend`, requestLend)
      .then((_response:LendingResult) => {
        if(_response) {          
          if(_response.success) {
            this._hideMessage(false, "Solicitud registrada exitosamente", MessageBarType.success );
          }
          else {            
            this._hideMessage(false, _response.message );
          }
        }                   
      })
      .catch(err => {
        console.log(err);  
        this._hideMessage(false, err, MessageBarType.severeWarning );      
      });
    }
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
  