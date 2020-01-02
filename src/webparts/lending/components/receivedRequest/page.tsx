import React from "react";
import {IReceivedRequestProps} from "./IReceivedRequestProps";
import { SubspaceProvider } from "react-redux-subspace";

import DetailList from "../../../../general/detailList";
import CommandBar from "../../../../general/commandBar";
import Modal from "../../../../general/modal";

import { IIOIPStore } from "../../../../redux/namespace";
import { Stack } from "office-ui-fabric-react";

export default function Page(props:IReceivedRequestProps) {
  const { modalVisible }  = props;
    return(
    <Stack>
        <div className="ms-Grid-row">
        <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
          <SubspaceProvider mapState={(state: IIOIPStore) => { return { commandBar: state.commandBar }; }} >
            <CommandBar />
          </SubspaceProvider>
        </div>
        <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
          <SubspaceProvider mapState={(state: IIOIPStore) => { return { detailList: state.detailList }; }} >
            <DetailList />
          </SubspaceProvider>
        </div>
      </div>
      { modalVisible 
         ?  <SubspaceProvider mapState={(state: IIOIPStore) => {
              return { modal: state.modalReceived, textAreaReceived : state.textAreaReceived, messageBarReceived: state.messageBarReceived }; }} >
              <Modal />
            </SubspaceProvider>
         : null
         }
    </Stack>
    );
}