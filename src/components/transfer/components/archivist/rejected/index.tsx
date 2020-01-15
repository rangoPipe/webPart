import React from "react";
import * as moment from "moment";
import { connect } from "react-redux";
import { subspace } from "redux-subspace";
import { IColumn, Selection, CheckboxVisibility, IGroup } from "office-ui-fabric-react";

import Page from "./page";

import { BaseService } from "../../../../../common/classes/baseService";
import { ColumnRecordArchivist } from "../../../../../interface/trasnfer/archivist/archivistResult";
import { apiTransferencia } from "../../../../../common/connectionString";

import { IIOIPStore } from "../../../../../redux/namespace";
import store from "../../../../../redux/store";
import { IRejectedProps, IRejectedState } from "./IRejectedProps";
import { RejectedNameSpace } from "../../../../../enum/archivist/archivistEnum";

import { selectRowItem, createDetailList, loadDetailList } from "../../../../../redux/actions/general/detailList/_actionName";

import { RecordState } from "../../../../../enum/RecordState";
import { TransferResultDTO, TransferDTO, TransferFilter } from "../../../../../interface/trasnfer/transferResult";


class RejectedClass extends React.Component<IRejectedProps, IRejectedState>  {

  /** @private */ private _detailListController = subspace( (state: IIOIPStore) => state.detailListRejectedArchivist, RejectedNameSpace.detailList)(store);

  private _http: BaseService = new BaseService();
  private _selection: Selection;

    constructor(props:IRejectedProps) {
       super(props);

       this._selection = new Selection({

        onSelectionChanged: () => {
          this._detailListController.dispatch({ type: selectRowItem, payload: this._selection.getSelection() });  
       }});
       
       this._detailListController.dispatch({
         type: createDetailList,
         payload: {
          items: [],
          columns: this._createColumns(),
          checkboxVisibility: CheckboxVisibility.always,
          selection:this._selection
         }
       });
    }

    /**
   * Retorna un arreglo de tipo IColumn para el DetailList
   * @private @returns {IColumn[]} Un arreglo de columnas para el DetailList
   */
    private _createColumns = (): IColumn[] => {
      const dateFormat = "YYYY/MM/DD";
      const columns: IColumn[] = [
        {
          key: "nroExpediente",
          name: "N° Expediente",
          fieldName: "nroExpediente",
          isResizable: true,
          data: "string",
          minWidth: 100,
          maxWidth: 150,
          onRender: (item: ColumnRecordArchivist) => {
            return <span>{item.nroExpediente}</span>;
          }
        },
        {
          key: "name",
          name: "Titulo expediente",
          fieldName: "name",
          isResizable: true,
          data: "string",
          minWidth: 250,
          maxWidth: 250,
          onRender: (item: ColumnRecordArchivist) => {
            return <span>{item.name}</span>;
          }
        },
        {
          key: "serie",
          name: "Serie",
          fieldName: "serie",
          isResizable: true,
          data: "string",
          minWidth: 250,
          maxWidth: 250,
          onRender: (item: ColumnRecordArchivist) => {
            return <span>{item.serie}</span>;
          }
        },
        {
          key: "subserie",
          name: "Subserie",
          fieldName: "subserie",
          isResizable: true,
          data: "string",
          minWidth: 250,
          maxWidth: 250,
          onRender: (item: ColumnRecordArchivist) => {
            return <span>{item.subserie}</span>;
          }
        },
        {
          key: "endDate",
          name: "Última fecha de modificación",
          fieldName: "endDate",
          isResizable: true,
          data: "string",
          minWidth: 100,
          onRender: (item: ColumnRecordArchivist) => {
            return <span>{moment(item.endDate).format(dateFormat)}</span>;
          }
        }
      ];

      return columns;
    }

    /**
     * Crea los grupos al momento de visualizar el listado de expedientes.
     * @private
     */
    private _createGroups = (data: ColumnRecordArchivist[]) => {
      try {
        let key: string = "", groups: IGroup[] = [];
        data.forEach((x: ColumnRecordArchivist, i: number) => {
          if (key !== `${x.nombreSeccion}_${x.nombreUsuario}`) {
            key = `${x.nombreSeccion}_${x.nombreUsuario}`;

            const count = data.filter( (y: ColumnRecordArchivist) => y.nombreSeccion === x.nombreSeccion && y.nombreUsuario === x.nombreUsuario ).length;
            groups.push({
              key,
              name: `Área: ${x.nombreSeccion} Usuario: ${x.nombreUsuario}"`,
              startIndex: i,
              count,
              isCollapsed: true
            });
          }
        });

        this._detailListController.dispatch({
          type: createDetailList,
          payload: {
            enableShimmer: false,
            items: data,
            groups,
            groupProps: {
              showEmptyGroups: true,
              collapseAllVisibility: true,
              checkboxVisibility: CheckboxVisibility.always
            }
          }
        });
      } catch (error) {}
    }


  /**
   * Asigna detalle de expedientes pedientes al DetailList
   * @param {TransferDTO[]} items Listado de items
   * @private
   */
  private _setDataPending = (items: TransferDTO[]) => {
    try {      
      let data: ColumnRecordArchivist[] = items.map((x: TransferDTO) => {
        return {
          nombreUsuario: x.nombreUsuario,
          nombreSeccion: x.nombreSeccion,
          key: x.idExpediente,
          name: x.name,
          nroExpediente: x.code,
          serie: x.nombreSerie,
          subserie: x.nombreSubserie,
          initialDate: x.dateIn,
          endDate: x.dateOut
        };
      });      

      this._createGroups(data);
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Caraga la el detalle de expedientes 
   * @param {RecordState} recordState Estado de los expedientes a visualizar.
   */
  private _loadData = (recordState: RecordState): void => {
    try {
      let body: TransferFilter = {
        state: [recordState]
      };

      this._http.FetchPost(`${apiTransferencia}/Api/Record/RecordExpired`, body).then((_response:TransferResultDTO) => {      
        if(_response) {
          this._setDataPending(_response.result);
        }
      })      
      .catch(err => {
        console.log(err);          
        this._detailListController.dispatch({ type: loadDetailList, payload: [] });
      });
      
    } catch (error) {
      console.log(error);      
      return undefined;
    }
  }


  /**
   * El componentDidMount() es llamado despues de renderizar el componente.
   */
  public async componentDidMount() {
    this._loadData(RecordState.RechazadoEnAC);    
  }

  public render(): JSX.Element {
    return <Page />;
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
  export default connect(mapStateToProps)(RejectedClass);
  