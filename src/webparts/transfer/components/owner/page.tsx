import * as React from "react";
import { SubspaceProvider } from "react-redux-subspace";

//Redux
import { IIOIPStore } from "../../../../redux/namespace";

//Propios
import DetailListGeneral from "../../../../general/detailList";
import { IOwnerProps } from "./ownerProps";
import "./style.css";

//Componentes
import Dialog from "../../../../general/dialog";
import CommandBar from "../../../../general/commandBar";

/**
 * Retorna el HTML del principal del propietario
 * @param {IOwnerProps} props Atributos del componente OwnerMain
 */
function Page(props: IOwnerProps) {
  const { commandBarVisible } = props;
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
          { commandBarVisible ? 
            <SubspaceProvider mapState={(state: IIOIPStore) => {  return { detailList: state.detailListOwner };  }} >
              <CommandBar />
            </SubspaceProvider>
            : null }
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
            textField: state.textAreaOwner,
            messageBar: state.messageBar
          };
        }}  >
        <Dialog />
      </SubspaceProvider>
    </div>
  );
}

export default Page;
