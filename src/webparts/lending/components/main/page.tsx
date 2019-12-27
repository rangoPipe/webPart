import * as React from "react";
import { Pivot, PivotItem } from "office-ui-fabric-react";

import ILendingMainProps from "./ILendingMainProps";

import SendRequest from "../sendedRequest";
import ReceivedRequest from "../receivedRequest";
import Devolution from "../devolution";
import Lending from "../lending";
import Search from "../search";

import { detailListNs, detailList2Ns, detailList3Ns, detailList4Ns, IIOIPStore } from "../../../../redux/namespace";
import { SubspaceProvider } from "react-redux-subspace";

export default function Page(props:ILendingMainProps) {
    return (
        <div className="ms-Grid" dir="ltr">
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
              <h1 className={"ms-font-xl ms-fontColor-themePrimary"} tabIndex={0}>
                Préstamos Documentales
              </h1>
            </div>
          </div>
          <div className="ms-Grid-row">
            <Pivot>
              <PivotItem
                headerText="Buscar"
                headerButtonProps={{
                  "data-order": 1,
                  "data-title": "My Files Title"
                }}
              >
                <div className="ms-Grid" dir="ltr">
                  <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">                      
                      <SubspaceProvider
                        mapState={(state: IIOIPStore) => {
                          return {
                            detailList: state.detailListSearch,
                            dropDownSectionSearch: state.dropDownSectionSearch,
                            dropDownSubsectionSearch: state.dropDownSubsectionSearch,
                            dropDownSerieSearch: state.dropDownSerieSearch,
                            dropDownSubserieSearch: state.dropDownSubserieSearch,                            
                            buttonSearchSearch: state.buttonSearchSearch,                            
                            buttonCancelSearch: state.buttonCancelSearch,
                            buttonLendSearch: state.buttonLendSearch,
                            modalSearch: state.modalSearch,
                            textAreaSearch: state.textAreaSearch,
                            messageBarSearch: state.messageBarSearch,
                          };
                        }}
                      >
                        <Search />
                      </SubspaceProvider>
                    </div>
                  </div>
                </div>
              </PivotItem>
              <PivotItem
                headerText="Solicitudes Enviadas"
                itemKey="sendedRequest"
                key="sendedRequest"
              >
                <div className="ms-Grid" dir="ltr">
                  <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                        <SendRequest namespace={detailListNs} />
                    </div>
                  </div>
                </div>
              </PivotItem>
              <PivotItem
                headerText="Solicitudes Recibidas"
                itemKey="receivedRequest"
                key="receivedRequest"
              >
                <div className="ms-Grid" dir="ltr">
                  <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                      <ReceivedRequest namespace={detailList2Ns} />
                    </div>
                  </div>
                </div>
              </PivotItem>
              <PivotItem
                headerText="Devoluciones"
                itemKey="devolution"
                key="devolution"
              >
                <div className="ms-Grid" dir="ltr">
                  <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                        <Devolution namespace={detailList3Ns} />
                    </div>
                  </div>
                </div>
              </PivotItem>
              <PivotItem
                headerText="Prestamos"
                itemKey="lendings"
                key="lendings"
              >
                <div className="ms-Grid" dir="ltr">
                  <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                        <Lending namespace={detailList4Ns} />
                    </div>
                  </div>
                </div>
              </PivotItem>
            </Pivot>
          </div>
        </div>
      );
}