import * as React from "react";
import { IApprovedProps } from "./IApprovedProps";
import { SubspaceProvider } from "react-redux-subspace";
import { Stack } from "office-ui-fabric-react";

import DetailList from "../../../../../general/detailList";
import { IIOIPStore } from "../../../../../redux/namespace";

export default function Page(props:IApprovedProps) {
    return (
    <Stack>
      <div className="ms-Grid" dir="ltr">
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
            <SubspaceProvider mapState={(state: IIOIPStore) => { return { detailList: state.detailListApprovedArchivist }; }}>
              <DetailList />
            </SubspaceProvider>
          </div>
        </div>
      </div>
    </Stack>
    );
}