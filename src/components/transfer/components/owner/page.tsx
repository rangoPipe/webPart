import * as React from "react";
import { SubspaceProvider } from "react-redux-subspace";
import { Stack } from "office-ui-fabric-react";

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
export default function Page(props: IOwnerProps) {
  return (
    <Stack>
      <div className="ms-Grid" dir="ltr">
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
    </Stack>
  );
}
