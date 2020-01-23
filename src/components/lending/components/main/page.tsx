import * as React from "react";
import { Stack, Nav, INavLink } from "office-ui-fabric-react";

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
  console.log(props);
  
  const { onClickMenu, menu } = props; 

    return (
      <Stack>
        <div className="ms-Grid" dir="ltr">
        <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12" style = { { overflowY:"scroll", marginTop:"9px", maxHeight:"420px" }}>
              <h1 className={"ms-font-xl ms-fontColor-themePrimary"} tabIndex={0}>
                { props.title }
              </h1>
            </div>
          </div>
          <div className="ms-Grid-row">
            <div className="ms-Grid-col md-sm12 ms-md2 ms-lg2">
              <Nav groups = {
                [
                  {
                    links: [
                      {
                        name: 'Bandeja de entrada',
                        url: 'https://ioip365.sharepoint.com/sites/Pruebas2#/',
                        icon: 'Inbox',
                        target: '_blank'
                      },
                      {
                        name: 'Préstamos',
                        url: '',
                        links: [
                          {
                            name: 'Buscar',
                            icon: 'FabricFolderSearch',
                            url: '',
                            key: 'searchLending',
                            onClick: (ev?: React.MouseEvent<HTMLElement>, item?: INavLink) => {
                              onClickMenu(item.key); 
                            }
                          },
                          {
                            name: 'Solicitudes enviadas',
                            url: '',
                            icon: 'ReceiptForward',
                            key: 'requestLending',
                            onClick: (ev?: React.MouseEvent<HTMLElement>, item?: INavLink) => {
                              onClickMenu(item.key);                            
                            }
                          },
                          {
                            name: 'Solicitudes recibidas',
                            url: '',
                            icon: 'ReceiptCheck',
                            key: 'receivedLending',
                            onClick: (ev?: React.MouseEvent<HTMLElement>, item?: INavLink) => {
                              onClickMenu(item.key);
                            }
                          },
                          {
                            name: 'Devoluciones',
                            url: '',
                            icon: 'ReturnToSession',
                            key: 'paybackLending',
                            onClick: (ev?: React.MouseEvent<HTMLElement>, item?: INavLink) => {
                              onClickMenu(item.key);                            
                            }
                          },
                          {
                            name: 'Préstamos',
                            url: '',
                            icon: 'WorkItemBug',
                            key: 'lendLending',
                            onClick: (ev?: React.MouseEvent<HTMLElement>, item?: INavLink) => {
                              onClickMenu(item.key);                            
                            }
                          },
                          {
                            name: 'Reportes',
                            url: '',
                            icon: 'CRMReport',
                            key: 'reportLending',
                            onClick: (ev?: React.MouseEvent<HTMLElement>, item?: INavLink) => {
                              onClickMenu(item.key);
                            }
                          }
                        ],
                        isExpanded: true
                      }]
                  }
                ]
               } />
            </div>
            <div className="ms-Grid-col md-sm12 ms-md10 ms-lg10">
              {
                 (menu === "searchLending") 
                  ? <SubspaceProvider
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
                :(menu === "requestLending")
                  ? <SubspaceProvider mapState={(state: IIOIPStore) => { 
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
                :(menu === "receivedLending")
                  ? <SubspaceProvider mapState={(state: IIOIPStore) => {
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
                : ( menu === 'paybackLending')
                  ? <SubspaceProvider mapState={(state: IIOIPStore) => {
                        return {
                          contextPayback : state.contextPayback,
                          detailListPayback: state.detailListPayback,
                          commandBarPayback: state.commandBarPayback,
                          dialogPayback: state.dialogPayback,
                          txtFilterDtlPayback : state.txtFilterDtlPayback,
                          }; }}>                        
                      <Payback key = { props.key }/>
                    </SubspaceProvider>
                : ( menu === "lendLending")
                  ? <SubspaceProvider mapState={(state: IIOIPStore) => {
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
                : ( menu === "reportLending")
                 ? <SubspaceProvider mapState={(state: IIOIPStore) => {                      
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
                :null
              }
            </div>
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