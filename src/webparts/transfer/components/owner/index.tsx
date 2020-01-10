// Terceros
import * as React from "react";
import * as moment from "moment";
import { Selection } from "office-ui-fabric-react";
import { subspace } from "redux-subspace";
import { WebPartContext } from "@microsoft/sp-webpart-base";

import { RecordState } from "../../../../enum/RecordState";
import Page from "./page";

//Redux
import store from "../../../../redux/store";
import { IIOIPStore } from "../../../../redux/namespace";
import { createDetailList, loadDetailList, selectRowItem } from "../../../../redux/actions/general/detailList/_actionName";
import { createCommandBar } from "../../../../redux/actions/general/commandBar/_actionName";

//Propios
import { apiTransferencia, resourceEndPointApi } from "../../../../common/connectionString";
import { MoveRecordDTO } from "../../../../interface/trasnfer/moveRecordDTO";
import { ColumnRecordOwner, IOwnerProps, IOwnerState } from "./ownerProps";
import { ApiRecordItem } from "../../../../common/classes/apiRecordItem";
import { OwnerMenu } from "./menu";
import { OwnerNameSpace } from "../../../../enum/owner/ownerEnum";
import { BaseService } from "../../../../common/classes/baseService";

/**
 * @class Clase OwnerMain contenedor principal del propietario.
 */
export default class OwnerMain extends React.Component<IOwnerProps, IOwnerState> {
  /** @private */ private _contextController = subspace( (state: IIOIPStore) => state.context, OwnerNameSpace.context )(store);
  /** @private */ private _detailListController = subspace( (state: IIOIPStore) => state.detailListOwner, OwnerNameSpace.detailListOwner )(store);
  /** @private */ private _commandBarController = subspace( (state: IIOIPStore) => state.commandBarOwner, OwnerNameSpace.commandBarOwner )(store);

  /** @private */ private _context: WebPartContext;
  /** @private */ private _selection: Selection;
  /** @private */ private _http: BaseService = new BaseService();

  /**
   * Crea una instancia de OwnerMain.
   * @param {IOwnerProps} props Recibe parametros inyectados por Redux.
   */
  constructor(props: IOwnerProps) {
    super(props);

    this.state = {
      commandBarVisible:false
    }

    this._selection =  new Selection({
      onSelectionChanged: () => {    

        let items, farItems = [];

        this._detailListController.dispatch({
          type: selectRowItem,
          payload: this._selection.getSelection()
        });

        if(this._selection.getSelectedCount() > 0) {
          items = (new OwnerMenu({})._getItems());
          farItems = (new OwnerMenu({})._getFarItems());
        }
        
        this._commandBarController.dispatch({type: createCommandBar, payload:{
          items,
          farItems
        }});
      }
    });

    this._detailListController.dispatch({
      type: createDetailList,
      payload: {
        columns: this.LoadColumns(),
        selection: this._selection
      }
    });

    this._context = this._contextController.getState().context;
  }

  /**
   * Retorna un arreglo de tipo IColumn para el DetailList
   * @returns {IColumn[]} Un arreglo de columnas para el DetailList
   */
  private LoadColumns = () => {
    const dateFormat = "YYYY/MM/DD";
    return [
      {
        key: "count",
        name: "N°",
        fieldName: "count",
        isRowHeader: true,
        isSorted: true,
        isSortedDescending: false,
        sortAscendingAriaLabel: "Sorted A to Z",
        sortDescendingAriaLabel: "Sorted Z to A",
        data: "string",
        minWidth: 30,
        maxWidth: 30,
        onRender: (item: ColumnRecordOwner) => {
          return <span>{item.count}</span>;
        }
      },
      {
        key: "nroExpediente",
        name: "N° Expediente",
        fieldName: "nroExpediente",
        isResizable: true,
        data: "string",
        minWidth: 100,
        maxWidth: 150,
        onRender: (item: ColumnRecordOwner) => {
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
        onRender: (item: ColumnRecordOwner) => {
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
        onRender: (item: ColumnRecordOwner) => {
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
        onRender: (item: ColumnRecordOwner) => {
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
        onRender: (item: ColumnRecordOwner) => {
          return <span>{moment(item.endDate).format(dateFormat)}</span>;
        }
      }
    ];
  }

  /**
   * Actualiza el store, con detalle de expedientes
   */
  private LoadData = async () => {

    const body: MoveRecordDTO = {
      State: [RecordState.ParaGestion]
    };

    this._http.FetchPost(`${apiTransferencia}/Api/Record/RecordExpired`, body)
      .then((_response:any) => {
        let data = _response.map((x: ApiRecordItem, i: number) => {
          return {
            count: i + 1,
            key: x.idExpediente,
            name: x.name,
            nroExpediente: x.code,
            serie: x.nombreSerie,
            subserie: x.nombreSubserie,
            initialDate: x.dateIn,
            endDate: x.dateOut
          };
        });

        this._detailListController.dispatch({ type: loadDetailList, payload: data });
      })
      .catch(err => {
        console.log(err);
        this._detailListController.dispatch({ type: createDetailList, payload: { enableShimmer:false  } });        
      });
  }

  /**
   * El componentDidMount() es llamado despues de renderizar el componente.
   */
  public componentDidMount() {
    this.LoadData();
  }

  /**
   * El metodo render() es requerido para generar el HTML.
   */
  public render(): JSX.Element {
    return <Page />;
  }
}
