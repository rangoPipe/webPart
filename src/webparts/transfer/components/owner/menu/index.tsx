// Terceros
import * as React from "react";
import { HttpClientResponse, AadHttpClient, IHttpClientOptions } from "@microsoft/sp-http";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { connect } from "react-redux";
import { subspace } from "redux-subspace";
import { SubspaceProvider } from "react-redux-subspace";
import { MessageBarType, DialogFooter, PrimaryButton, DefaultButton, ICommandBarItemProps } from "office-ui-fabric-react";

//Componentes
import TextFieldGeneral from "../../../../../general/textField";
import MessageBarGeneral from "../../../../../general/messageBar";

//Redux
import store from "../../../../../redux/store";
import { IIOIPStore } from "../../../../../redux/namespace";
import { createDialog } from "../../../../../redux/actions/general/dialog/_actionName";
import { createTextField } from "../../../../../redux/actions/general/textField/_actionName";
import { createMessageBar } from "../../../../../redux/actions/general/messageBar/_actionName";

//Propios
import Page from "./page";
import { apiTransferencia, resourceEndPointApi } from "../../../../../common/connectionString";
import { MoveRecordDTO } from "../../../../../interface/trasnfer/moveRecordDTO";
import { RecordState } from "../../../../../enum/RecordState";
import { IOwnerMenuProps } from "./IOwnerMenuProps";
import { ColumnRecordOwner } from "../ownerProps";
import { OwnerNameSpace } from "../../../../../enum/owner/ownerEnum";

/**
 * @class Clase OwnerMenu contenedora del menu.
 */
export class OwnerMenu extends React.Component<IOwnerMenuProps> {
  /** @private */ private _contextController = subspace( (state: IIOIPStore) => state.contextOwner, OwnerNameSpace.context)(store);
  /** @private */ private _dialogController = subspace( (state: IIOIPStore) => state.dialogOwner, OwnerNameSpace.detailListOwner)(store);
  /** @private */ private _textFieldController = subspace( (state: IIOIPStore) => state.textAreaOwner, OwnerNameSpace.textAreaOwner)(store);
  /** @private */ private _messageBarController = subspace( (state: IIOIPStore) => state.messageBarOwner, OwnerNameSpace.messageBarOwner)(store);  
  /** @private */ private _commandBarController = subspace( (state: IIOIPStore) => state.commandBarOwner, OwnerNameSpace.commandBarOwner)(store);
  /** @private */ private _context: WebPartContext;
  /** @private */ private _footerDialogDefault: any;
  /** @private */ private _bodyDialogDefault: any;

  /**
   * Crea una instancia de OwnerMenu.
   * @param {IOwnerMenuProps} props Recibe parametros inyectados por Redux.
   */
  constructor(props: IOwnerMenuProps) {
    super(props);
    this._footerDialogDefault = (
      <div>
        <DialogFooter>
          <DefaultButton onClick={this._onClose} text="Cerrar" />
        </DialogFooter>
      </div>
    );
    this._bodyDialogDefault = (
      <div>
        <SubspaceProvider mapState={(state: IIOIPStore) => { return { messageBar: state.messageBarOwner }; }} >
          <MessageBarGeneral />
        </SubspaceProvider>
      </div>
    );

    this._context = this._contextController.getState().context;
  }

  /**
   * Retorna un arreglo de ICommandBarItemProps para el menu principal
   * @returns {ICommandBarItemProps[]} Arreglo de botones
   * @private
   */
  public _getItems = (): ICommandBarItemProps[] => {
    return [
      {
        key: "aprove",
        name: "Solicitar transferencia",
        iconProps: {
          iconName: "Like"
        },
        onClick: () => {
          this._hideMessage();
          this._createDialog(
            "Esta Seguro ?",
            "Desea solicitar transferencia para los expedientes seleccionados ?",
            this._bodyDialogDefault,
            <div>
              <DialogFooter>
                <PrimaryButton onClick={this._onAcceptAprove} text="Aceptar" />
                <DefaultButton onClick={this._onClose} text="Cancelar" />
              </DialogFooter>
            </div>
          );
        }
      },
      {
        key: "reject",
        name: "Posponer",
        iconProps: {
          iconName: "WorkFlow"
        },
        onClick: () => {
          this._hideMessage();
          this._textFieldController.dispatch({
            type: createTextField,
            payload: {
              label: "Motivo: ",
              multiline: true,
              rows: 3,
              disabled: false,
              defaultValue: undefined,
              value: undefined
            }
          });
          this._createDialog(
            "Esta seguro ?",
            "Desea posponer los expedientes seleccionados ?",
            <div>
              <SubspaceProvider mapState={(state: IIOIPStore) => { return { messageBar: state.messageBarOwner }; }}>
                <MessageBarGeneral />
              </SubspaceProvider>
              <SubspaceProvider  mapState={(state: IIOIPStore) => {  return { textField: state.textAreaOwner }; }}>
                <TextFieldGeneral />
              </SubspaceProvider>
            </div>,
            <div>
              <DialogFooter>
                <PrimaryButton onClick={this._onAcceptReject} text="Aceptar" />
                <DefaultButton onClick={this._onClose} text="Cancelar" />
              </DialogFooter>
            </div>
          );
        }
      }
    ];
  }

  /**
   * Retorna un arreglo de ICommandBarItemProps para el menu secundario
   * @returns {ICommandBarItemProps[]} Arreglo de botones
   * @private
   */
  public _getFarItems = (): ICommandBarItemProps[] => {
    return [
      {
        key: "info",
        name: "Información",
        ariaLabel: "info",
        iconProps: {
          iconName: "Info"
        },
        iconOnly: true,
        onClick: () => console.log("Info")
      }
    ];
  }

  /**
   * Ejecuta aprobacion para los expedientes.
   * @event @private
   */
  private _onAcceptAprove = () => {
    this._changeState(RecordState.AprobadoParaAC);
  }

  /**
   * Ejecuta rechazo para los expedientes.
   * @event @private
   */
  private _onAcceptReject = () => {
    let motive: string = this._textFieldController.getState().value;
    if (!motive || motive.trim().length === 0) {
      this._showMessage(
        "Por favor indique un motivo",
        MessageBarType.warning,
        true
      );
      return;
    }

    this._changeState(RecordState.PospuestoParaAC);
  }

  /**
   * Ejecuta clausura del componente Dialog.
   * @event @private
   */
  private _onClose = () => {
    this._dialogController.dispatch({
      type: createDialog,
      payload: {
        hideDialog: true
      }
    });
  }

  /**
   * Modifica el estado de los expedientes segun el estado.
   * @param {RecordState} recordState Nuevo estado de los expedientes seleccionados.
   * @event @private
   */
  private _changeState = async (recordState: RecordState) => {
    try {
      const { selectedItems } = this.props.detailList;

      if (selectedItems.length === 0) {
        this._showMessage(
          "Seleccione al menos un elemento",
          MessageBarType.info
        );
        return;
      }

      this._createDialog("Procesando...", "Procesando información");

      let body: MoveRecordDTO = {
        Record: [],
        IdUsuario: 1,
        State: [recordState]
      };

      if (recordState === RecordState.PospuestoParaAC) {
        body.Description = this._textFieldController.getState().value;
      }

      selectedItems.map((x: ColumnRecordOwner) => {
        return body.Record!.push({
          idExpediente: x.key
        });
      });

      const aadClient:AadHttpClient = new AadHttpClient(this._context.serviceScope, resourceEndPointApi);

      const requestHeaders: Headers = new Headers();
      requestHeaders.append('Content-type', 'application/json');
      requestHeaders.append("Accept","application/json");

      const requestOptions : IHttpClientOptions = {
        headers:requestHeaders,
        body: JSON.stringify(body)
      };

      let response: Promise<HttpClientResponse> = aadClient.post(`${apiTransferencia}/Api/Record/MoveRecordExpired`,
        AadHttpClient.configurations.v1,
        requestOptions
      );

      await response.then(
        async (_response: HttpClientResponse) => {
          let result = await _response.json();
          if (!_response.ok) {
            this._showMessage(result, MessageBarType.error, true);
            return;
          }

          if (result.result) {
            this._dialogController.dispatch({
              type: createDialog,
              payload: {
                hideDialog: true
              }
            });
            this._showMessage(result.message, MessageBarType.success);
            window.location.reload();
          } else {
            this._showMessage(result.message, MessageBarType.error, true);
          }
        },
        err => {
          console.log(err);
        }
      );
    } catch (error) {
      this._showMessage(error, MessageBarType.error, true);
    }
  }

  /**
   * Modifica el estado del componente Dialog en el store.
   * @param {string} message Mensaje a mostrar en el dialog.
   * @param {MessageBarType} type Tipo del dialog.
   * @param {boolean} truncated Texto comprimido en una linea.
   * @event @private
   */
  private _showMessage = (
    message: string,
    type: MessageBarType = MessageBarType.info,
    truncated: boolean = false
  ) => {
    this._messageBarController.dispatch({
      type: createMessageBar,
      payload: {
        messageBarType: type,
        value: message,
        hideMessage: false,
        truncated
      }
    });
  }

  /**
   * Reinicializa el estado del componente Dialgo en el store.
   * @event @private
   */
  private _hideMessage = () => {
    this._messageBarController.dispatch({
      type: createMessageBar,
      payload: {
        messageBarType: MessageBarType.info,
        value: undefined,
        hideMessage: true
      }
    });
  }

  /**
   * Se inicializa el componente dialog en el store.
   * @param {string} title Titulo del dialog.
   * @param {string} subText Tipo del dialog.
   * @param {any} body Elemento HTML para el cuerpo del dialog.
   * @param {any} footer Elemento HTML para el pie de pagina del dialog.
   * @event @private
   */
  private _createDialog = (
    title: string,
    subText: string,
    body: any = this._bodyDialogDefault,
    footer: any = this._footerDialogDefault
  ) => {
    this._dialogController.dispatch({
      type: createDialog,
      payload: {
        title,
        subText,
        hideDialog: false,
        body,
        footer
      }
    });
  }

  /**
   * El metodo render() es requerido para generar el HTML.
   */
  public render(): JSX.Element {
    return <Page />;
  }
}

const mapStateToProps = (state: IIOIPStore) => {
  return {
    detailList: state.detailList,
    dialog: state.dialog
  };
};

/**
 * Conecta el componente con el store de Redux
 * @param {function} mapStateToProps https://react-redux.js.org/api/connect#mapdispatchtoprops-object-dispatch-ownprops-object
 */
export default connect(mapStateToProps)(OwnerMenu);
