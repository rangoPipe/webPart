import React from "react";
import { ILendingProps } from "./ILendingProps";
import { SubspaceProvider } from "react-redux-subspace";
import { Stack } from "office-ui-fabric-react";

import { IIOIPStore } from "../../../../redux/namespace";
import DetailListGeneral from "../../../../general/detailList";
import CommandBar from "../../../../general/commandBar";
import Dialog from "../../../../general/dialog";
import Modal from "../../../../general/modal";

export default function Page(props:ILendingProps) {
  const { modalVisible } = props;  
    return (
    <Stack>
      <div className="ms-Grid-row">
        <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
          <SubspaceProvider mapState={(state: IIOIPStore) => { return { commandBar: state.commandBarLending }; }} >
            <CommandBar />
          </SubspaceProvider>
        </div>
        <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
          <SubspaceProvider mapState={(state: IIOIPStore) => {  return { detailList: state.detailListLending };  }}>
            <DetailListGeneral />
          </SubspaceProvider>
        </div>
      </div>
      
      <SubspaceProvider mapState={(state: IIOIPStore) => { return { dialog: state.dialogLending }; }} >
        <Dialog />
      </SubspaceProvider>
      { modalVisible 
         ?  <SubspaceProvider mapState={(state: IIOIPStore) => { 
              return { modal: state.modalLending, textField : state.textAreaLending, messageBar: state.messageBarLending }; }} >
              <Modal />
            </SubspaceProvider>
         : null
         }
    </Stack>
    );
}