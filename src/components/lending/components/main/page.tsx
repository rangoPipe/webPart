import * as React from "react";
import { Pivot, PivotItem, Stack } from "office-ui-fabric-react";

import { ILendingMainProps } from "./ILendingMainProps";

import SendRequest from "../sendedRequest";
import ReceivedRequest from "../receivedRequest";
import Payback from "../payback";
import Lending from "../lending";
import Search from "../search";
import Report from "../report";
import Overlay from "../../../../general/overlay";

import { IIOIPStore } from "../../../../redux/namespace";
import { SubspaceProvider } from "react-redux-subspace";

/**
 * Retorna el HTML del principal del componente prestamos
 * @param {ILendingMainProps} props Atributos del componente LendingMain
 */
export default function Page(props:ILendingMainProps) {
    return (
      <Stack>
        <div className="ms-Grid" dir="ltr">
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
              <h1 className={"ms-font-xl ms-fontColor-themePrimary"} tabIndex={0}>
                { props.title }
              </h1>
            </div>
          </div>
          <div className="ms-Grid-row">
            <Pivot>
              <PivotItem
                headerText="Buscar"
                headerButtonProps={{
                  "data-order": 1,
                  "data-title": "search"
                }}
              >
                <div className="ms-Grid" dir="ltr">
                  <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">                      
                      <SubspaceProvider
                        mapState={(state: IIOIPStore) => {
                          return {
                            contextSearch : state.contextSearch,
                            detailListSearch: state.detailListSearch,
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
                        <Search key = { props.key } />
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
                      <SubspaceProvider mapState={(state: IIOIPStore) => { 
                        return {
                          contextSended: state.contextSended,
                          detailListSended: state.detailListSended,
                          commandBarSended: state.commandBarSended,
                          modalSended : state.modalSended,
                          dialogSended : state.dialogSended,
                          txtFilterDtlSended : state.txtFilterDtlSended
                          }; }}>                        
                          <SendRequest key = { props.key } />
                      </SubspaceProvider>
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
                      <SubspaceProvider mapState={(state: IIOIPStore) => {
                          return { 
                            contextReceived: state.contextReceived,
                            detailListReceived: state.detailListReceived,
                            commandBarReceived: state.commandBarReceived,
                            modalReceived: state.modalReceived,
                            messageBarReceived: state.messageBarReceived,
                            textAreaReceived: state.textAreaReceived,
                            choiceGroupReceived: state.choiceGroupReceived,
                            btnLeadReceived : state.btnLeadReceived,
                            txtFilterDtlReceived : state.txtFilterDtlReceived
                            }; }}>                        
                        <ReceivedRequest key = { props.key }/>
                      </SubspaceProvider>
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
                    <SubspaceProvider mapState={(state: IIOIPStore) => {
                          return {
                            contextPayback : state.contextPayback,
                            detailListPayback: state.detailListPayback,
                            commandBarPayback: state.commandBarPayback,
                            dialogPayback: state.dialogPayback,
                            txtFilterDtlPayback : state.txtFilterDtlPayback,
                            }; }}>                        
                        <Payback key = { props.key }/>
                      </SubspaceProvider>
                    </div>
                  </div>
                </div>
              </PivotItem>
              <PivotItem
                headerText="Préstamos"
                itemKey="lendings"
                key="lendings"
              >
                <div className="ms-Grid" dir="ltr">
                  <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                    <SubspaceProvider mapState={(state: IIOIPStore) => {
                          return {
                            contextLending: state.contextLending,
                            detailListLending: state.detailListLending,
                            commandBarLending: state.commandBarLending,
                            dialogLending : state.dialogLending,
                            modalLending: state.modalLending,
                            messageBarLending: state.messageBarLending,
                            textAreaLending: state.textAreaLending,
                            txtFilterDtlLending : state.txtFilterDtlLending,
                            }; }}>                        
                        <Lending key = { props.key }/>
                      </SubspaceProvider>
                    </div>
                  </div>
                </div>
              </PivotItem>
              <PivotItem
                headerText="Reportes"
                itemKey="reports"
                key="reports"
              >
                <div className="ms-Grid" dir="ltr">
                  <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                    <SubspaceProvider mapState={(state: IIOIPStore) => {                      
                          return {
                            contextReport: state.contextReport,
                            detailListReport: state.detailListReport,                           
                            buttonSearchReport: state.buttonSearchReport,
                            buttonCancelReport: state.buttonCancelReport,
                            datePickerStartReport: state.datePickerStartReport,
                            datePickerEndReport: state.datePickerEndReport,
                            chkSendedReport: state.chkSendedReport,
                            chkRequestReport: state.chkRequestReport,
                            chkAcceptedReport: state.chkAcceptedReport,
                            chkRejectedReport: state.chkRejectedReport,
                            chkLendedReport: state.chkLendedReport,
                            chkPaybackReport: state.chkPaybackReport,
                            }; }}>                        
                        <Report key = { props.key }/>
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