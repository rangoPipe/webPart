import React from "react";
import ISendedRequestProps from "./ISendedRequestProps";
import { SubspaceProvider } from "react-redux-subspace";

import DetailListGeneral from "../../../../general/detailList";
import { IIOIPStore } from "../../../../redux/namespace";

export default function Page(props:ISendedRequestProps) {
    return(
    <div>
        <div className="ms-Grid-row">
        <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
          <SubspaceProvider mapState={(state: IIOIPStore) => { return { detailList: state.detailList }; }} >
            <DetailListGeneral/>
          </SubspaceProvider>
        </div>
      </div>
    </div>
    );
}