import * as React from "react";
import { Pivot, PivotItem, Stack } from "office-ui-fabric-react";

//Redux
import { IIOIPStore } from "../../../../../redux/namespace";
import { SubspaceProvider } from "react-redux-subspace";

//Propios
import { IArchivistMainProps } from "./IArchivistMain";

//componentes
import Pending from "../pending";
import Approved from "../approved";
import Rejected from "../rejected";
import Overlay from "../../../../../general/overlay";

export default function Page(props:IArchivistMainProps) {
  
    return (
      <Stack>
        <div className="ms-Grid" dir="ltr">
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
              <h1 className={"ms-font-xl ms-fontColor-themePrimary"} tabIndex={0}>
                { props.title }
                <small> Archivista</small>
              </h1>
            </div>
          </div>
          <div className="ms-Grid-row">
            <Pivot>
              <PivotItem
                headerText="Pendientes"
                headerButtonProps={{
                  "data-order": 1,
                  "data-title": "pendings"
                }}
              >
                <div className="ms-Grid" dir="ltr">
                  <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">                      
                    <SubspaceProvider
                        mapState={(state: IIOIPStore) => {
                          return { 
                            detailListPendingArchivist : state.detailListPendingArchivist,
                            commandBarPendingArchivist: state.commandBarPendingArchivist,
                            dialogPendingArchivist: state.dialogPendingArchivist,
                            messageBarPendingArchivist : state.messageBarPendingArchivist,
                            textAreaPendingArchivist: state.textAreaPendingArchivist
                          };
                        }}
                      >
                        <Pending key = { props.key } />
                      </SubspaceProvider>
                    </div>
                  </div>
                </div>
              </PivotItem>
              <PivotItem
                headerText="Aprobados"
                itemKey="approved"
                key="approved"
              >
                <div className="ms-Grid" dir="ltr">
                  <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                      <SubspaceProvider
                        mapState={(state: IIOIPStore) => {
                          return { 
                            detailListApprovedArchivist : state.detailListApprovedArchivist,
                          };
                        }} >
                        <Approved key = { props.key } />
                      </SubspaceProvider>
                    </div>
                  </div>
                </div>
              </PivotItem>
              <PivotItem
                headerText="Rechazados"
                itemKey="rejected"
                key="rejected"
              >
                <div className="ms-Grid" dir="ltr">
                  <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                    <SubspaceProvider
                        mapState={(state: IIOIPStore) => {
                          return { 
                            detailListRejectedArchivist : state.detailListRejectedArchivist,
                          };
                        }} >
                        <Rejected key = { props.key } />
                      </SubspaceProvider>
                    </div>
                  </div>
                </div>
              </PivotItem>              
            </Pivot>
          </div>
        </div>
        <Stack>
          <SubspaceProvider  mapState={(state: IIOIPStore) => { return { overlay : state.overlay }; }}>
            <Overlay key = { props.key } />
          </SubspaceProvider>
        </Stack>
      </Stack>
      );
}