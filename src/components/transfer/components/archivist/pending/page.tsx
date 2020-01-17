import * as React from "react";
import { IPendingProps } from "./IPendingProps";
import { SubspaceProvider } from "react-redux-subspace";
import { Stack } from "office-ui-fabric-react";

import DetailList from "../../../../../general/detailList";
import CommandBar from "../../../../../general/commandBar";
import Dialog from "../../../../../general/dialog";
import { IIOIPStore } from "../../../../../redux/namespace";

export default function Page(props:IPendingProps) {
    return (
    <Stack>
      <div className="ms-Grid" dir="ltr">
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
            <SubspaceProvider
              mapState={(state: IIOIPStore) => {
                return { 
                  commandBar: state.commandBarPendingArchivist
                };
              }} >
              <CommandBar />
            </SubspaceProvider>
          </div>
        </div>
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
            <SubspaceProvider mapState={(state: IIOIPStore) => { return { detailList: state.detailListPendingArchivist }; }}>
              <DetailList />
            </SubspaceProvider>
          </div>
        </div>
        <SubspaceProvider
          mapState={(state: IIOIPStore) => {
            return {
              dialog: state.dialogPendingArchivist,
              textAreaPendingArchivist: state.textAreaPendingArchivist,
              messageBarPendingArchivist: state.messageBarPendingArchivist
            };
          }}>
          <Dialog />
        </SubspaceProvider>
      </div>
    </Stack>
    );
}