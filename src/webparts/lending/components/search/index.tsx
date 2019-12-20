import React from "react";
import { connect } from "react-redux";
import { subspace, Subspace } from "redux-subspace";

import Page from "./page";
import store from "../../../../redux/store";

import { ISearchProps, ISearchState, SectionVisibleEnum, IdDropdownsEnum } from "./ISearchProps";
import { IIOIPStore } from "../../../../redux/namespace";
import { IButtonProps } from "../../../../redux/reducers/general/button/IButtonProps";
import { IChoiceGroupProps } from "../../../../redux/reducers/general/choiceGroup/IChoiceGroupProps";
import { IChoiceGroupOptionProps, createTheme, IColumn, IDropdownOption, Selection } from "office-ui-fabric-react";
import { IDropdownProps } from "../../../../redux/reducers/general/dropdown/IDropdownProps";
import { IDetailListProps } from "../../../../redux/reducers/general/detailList/IDetailListProps";

import { BaseService } from "../../../../common/classes/baseService";
import { LendingResultFilter, LendingFilter, LendingResultDTO, LendingDTO } from "../../../../interface/lending/lendingResult";
import { apiTransferencia } from "../../../../common/connectionString";
import { createDetailList } from "../../../../redux/actions/general/detailList/_actionName";

class SearchClass extends React.Component<ISearchProps, ISearchState> {

  private _detailListController:Subspace<IDetailListProps, any, IIOIPStore>;

  private _buttons: IButtonProps[];
  private _dropdowns: IDropdownProps[];
  private _choiceGroup: IChoiceGroupProps;
  private _resultdetailList: IDetailListProps;

  private _lendingFilter: LendingFilter = {};

  private _http: BaseService = new BaseService();
  private _selection: Selection;

  constructor(props: ISearchProps) {
    super(props);

    this._detailListController  = subspace((state: IIOIPStore) => props.detailList )(store);
    
    this.state = {
      sectionVisible: SectionVisibleEnum.Record,
      resultVisible: false,
      hideLendingButton: true,

      noRecord: null,
      titleRecord: null,
      noFiled: null,
      subjectFiled: null,
      noTypeDocumental: null,
      titleTypeDocumental: null,
      optSection : [],
      optSubsection : [],
      optSerie : [],
      optSubserie : [],
    };

    this._detailListController.dispatch({ type: createDetailList, payload: {
      columns: this._loadColumns()
    }});

    this._selection = new Selection({
      onSelectionChanged: () => {

        this._detailListController.dispatch({ type: createDetailList, payload: {
          selectedItems: this._selection.getSelection(),
          items:[]
        }});
        
        this.setState({
          ...this.state,
          hideLendingButton: !(this._selection.getSelectedCount() > 0)
        })
      }
    });

    this._createForm();
    
  }

  componentDidMount() {
    this._loadDropdown();
  }

  componentDidUpdate() {    
    if (this.state.resultVisible) {
      window.scrollTo(0, document.body.scrollHeight);
    }

    this._createForm();
  }

  private _createButtons() {
    
    this._buttons = [
      {
        text: "Buscar",
        primary: true,
        iconProps: {
          iconName: "Search"
        },
        onClick: e => {
          this._loadPendings();
        }
      },
      {
        text: "Solicitar Prestamo",
        primary: true,
        hidden: this.state.hideLendingButton,
        iconProps: {
          iconName: "Search"
        },
        onClick: e => {}
      },
      {
        text: "Cancelar",
        onClick: e => {
          console.log("Cancelar", e);
          
          this.setState({
            ...this.state,
            resultVisible: false
          });
        }
      }
    ];
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
    
    this._dropdowns = [
      {
        options: this.state.optSection,
        id: IdDropdownsEnum.ddlSection.toString(),
        placeholder: "Seleccione una Sección",
        onChange: (e:React.FormEvent, o:IDropdownOption) => {
          this._lendingFilter.idSeccion = o.key;
          this._loadDropdown();
        }
      },
      {
        options: this.state.optSubsection,
        id: IdDropdownsEnum.ddlSubsection.toString(),
        placeholder: "Seleccione una Subsección",
        onChange: (e:React.FormEvent, o:IDropdownOption) => {
          this._lendingFilter.idSubseccion = o.key;
        }
      },
      {
        options: this.state.optSerie,
        id: IdDropdownsEnum.ddlSerie.toString(),
        placeholder: "Seleccione una Serie",
        onChange: (e:React.FormEvent, o:IDropdownOption) => {
          this._lendingFilter.idSerie = o.key;
          this._loadDropdown();
        }
      },
      {
        options: this.state.optSubserie,
        id: IdDropdownsEnum.ddlSubserie.toString(),
        placeholder: "Seleccione una Subserie",
        onChange: (e:React.FormEvent, o:IDropdownOption) => {
          this._lendingFilter.idSubserie = o.key;
        }
      }
    ];
  }

  private _loadColumns = (): IColumn[] => {
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

            let optSection:IDropdownOption[] = [];  
            _response.result.section.forEach( (x:any) => {
              optSection.push({ key:x.idSeccion, text: x.nombre });
            }); 

            let optSerie:IDropdownOption[] = [];  
            _response.result.serie.forEach( (x:any) => {            
              optSerie.push({ key:x.idSerie, text: x.nombre });
            }); 

            let optSubserie:IDropdownOption[] = [];  
            _response.result.subserie.forEach( (x:any) => {            
              optSubserie.push({ key:x.idSubserie, text: x.nombre });
            }); 

            let optSubsection:IDropdownOption[] = [];  
            _response.result.subsection.forEach( (x:any) => {            
              optSubsection.push({ key:x.idSeccion, text: x.nombre });
            });            
  
            this.setState({
              ...this.state,
              optSection,
              optSerie,
              optSubsection,
              optSubserie
            })
  
            this.forceUpdate()
          } 
        }                   
      })
      .catch(err => {
        console.log(err);        
      });
  }


  private _createForm(){
    this._createButtons();
    this._createChoices();
    this._createDropdowns();
  }

  private _loadPendings = () => {
    this._http.FetchPost(`${apiTransferencia}/Api/Lending/Lendings`, this._lendingFilter)
      .then((_response:LendingResultDTO) => {
        if(_response.success) {        
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
        namespace={this.props.namespace}
        sectionVisible={this.state.sectionVisible}
        resultVisible={this.state.resultVisible}
        buttons={this._buttons}
        choiceGroup={this._choiceGroup}
        dropdowns={this._dropdowns}
        resultDetailList = { this._resultdetailList }
      />
    );
  }
}

const mapStateToProps = (state: IIOIPStore) => {
    return {
      detailList: state.detailList
    };
  };
  
  /**
   * Conecta el componente con el store de Redux
   * @param {function} mapStateToProps https://react-redux.js.org/api/connect#mapdispatchtoprops-object-dispatch-ownprops-object
   */
  export default connect(mapStateToProps)(SearchClass);
  