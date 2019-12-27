import React from "react";
import IReceivedRequestProps from "./IReceivedRequestProps";
import { SubspaceProvider } from "react-redux-subspace";

import DetailListGeneral from "../../../../general/detailList";

export default function Page(props:IReceivedRequestProps) {
    return(
    <div>
        <div className="ms-Grid-row">
        <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
          <SubspaceProvider
            mapState={(state: any) => {
              return { detailList: state[props.namespace] };
            }}
            namespace={props.namespace}
          >
            <DetailListGeneral namespace={props.namespace} />
          </SubspaceProvider>
        </div>
      </div>
    </div>
    );
}