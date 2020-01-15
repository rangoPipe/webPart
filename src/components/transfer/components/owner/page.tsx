import * as React from "react";
import { SubspaceProvider } from "react-redux-subspace";

//Redux
import { IIOIPStore } from "../../../../redux/namespace";

//Propios
import DetailListGeneral from "../../../../general/detailList";
import { IOwnerProps } from "./IOwnerProps";
import "./style.css";

//Componentes
import Dialog from "../../../../general/dialog";
import CommandBar from "../../../../general/commandBar";

/**
 * Retorna el HTML del principal del propietario
 * @param {IOwnerProps} props Atributos del componente OwnerMain
 */
function Page(props: IOwnerProps) {
  return (
    <div className="ms-Grid" dir="ltr">
      <div className="ms-Grid-row">
        <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
          <h1 className={"ms-font-xl ms-fontColor-themePrimary"} tabIndex={0}>
            Expedientes pendientes por transferir
            <small> Propietario</small>
          </h1>
        </div>
      </div>
      <div className="ms-Grid-row">
        <div className="ms-Grid-col ms-md12">
            <SubspaceProvider mapState={(state: IIOIPStore) => {  return { commandBar: state.commandBarOwner };  }} >
              <CommandBar />
            </SubspaceProvider>
        </div>
      </div>
      <div className="ms-Grid-row">
        <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
          <SubspaceProvider mapState={(state: IIOIPStore) => {  return { detailList: state.detailListOwner };  }} >
            <DetailListGeneral />
          </SubspaceProvider>
        </div>
      </div>
      <SubspaceProvider
        mapState={(state: IIOIPStore) => {
          return {
            dialog: state.dialogOwner,
            textAreaOwner: state.textAreaOwner,
            messageBarOwner: state.messageBarOwner
          };
        }}  >
        <Dialog />
      </SubspaceProvider>
    </div>
  );
}

export default Page;
