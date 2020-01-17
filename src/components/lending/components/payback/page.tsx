import * as React from "react";
import { IPaybackProps } from "./IPaybackProps";
import { SubspaceProvider } from "react-redux-subspace";
import { Stack } from "office-ui-fabric-react";

import { IIOIPStore } from "../../../../redux/namespace";
import DetailListGeneral from "../../../../general/detailList";
import Dialog from "../../../../general/dialog";
import CommandBar from "../../../../general/commandBar";

export default function Page(props:IPaybackProps) {
    return(
    <Stack>
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
            <SubspaceProvider mapState={(state: IIOIPStore) => { return { commandBar: state.commandBarPayback }; }} >
              <CommandBar />
            </SubspaceProvider>
          </div>
        <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
          <SubspaceProvider  mapState={(state: IIOIPStore) => { return { detailList: state.detailListPayback }; }}>
            <DetailListGeneral />
          </SubspaceProvider>
        </div>
      </div>
      <SubspaceProvider mapState={(state: IIOIPStore) => { return { dialog: state.dialogPayback }; }} >
        <Dialog />
      </SubspaceProvider>
    </Stack>
    );
}