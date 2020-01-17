import * as React from "react";
import { SubspaceProvider } from "react-redux-subspace";
import { Stack } from "office-ui-fabric-react";
import { ISendedRequestProps } from "./ISendedRequestProps";
import { IIOIPStore } from "../../../../redux/namespace";

import DetailListGeneral from "../../../../general/detailList";
import CommandBar from "../../../../general/commandBar";
import Modal from "../../../../general/modal";
import Dialog from "../../../../general/dialog";

export default function Page(props:ISendedRequestProps) {  
  const { modalVisible } = props;
    return(
    <Stack>
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
            <SubspaceProvider mapState={(state: IIOIPStore) => { return { commandBar: state.commandBarSended }; }} >
              <CommandBar />
            </SubspaceProvider>
          </div>
          <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
            <SubspaceProvider mapState={(state: IIOIPStore) => { return { detailList: state.detailListSended }; }} >
              <DetailListGeneral/>
            </SubspaceProvider>
          </div>
      </div>
      { modalVisible 
         ?  <SubspaceProvider mapState={(state: IIOIPStore) => { return { modal: state.modalSended }; }} >
              <Modal />
            </SubspaceProvider>
         : null
      }
      <SubspaceProvider mapState={(state: IIOIPStore) => { return { dialog: state.dialogSended }; }} >
        <Dialog />
      </SubspaceProvider>
    </Stack>
    );
}