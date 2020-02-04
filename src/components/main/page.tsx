import * as React from "react";
import { Stack, Nav, INavLink } from "office-ui-fabric-react";
import { SubspaceProvider } from "react-redux-subspace";

import { IMainProps } from "./IMain";

import Overlay from "../../general/overlay";

import { IIOIPStore } from "../../redux/namespace";
import { EnumModules } from "../../common/enum/mainEnum";

/**
 * Retorna el HTML del principal del componente
 * @param {IMainProps} props Atributos del componente
 */
export default function Page(props:IMainProps) {
  
  const { onClickMenu, menu, getComponent } = props; 

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
                      },{
                        name: 'Transferencia',
                        url: '',
                        links: [
                          {
                            name: 'Propietario',
                            icon: 'FabricFolderSearch',
                            url: '',
                            key: EnumModules.Owner,
                            onClick: (ev?: React.MouseEvent<HTMLElement>, item?: INavLink) => {
                              onClickMenu(item.key); 
                            }
                          },
                          {
                            name: 'Archivista',
                            url: '',
                            links: [
                              {
                                name: 'Pendientes',
                                icon: 'FabricFolderSearch',
                                url: '',
                                key: EnumModules.PendingArchivist,
                                onClick: (ev?: React.MouseEvent<HTMLElement>, item?: INavLink) => {
                                  onClickMenu(item.key); 
                                }
                              },
                              {
                                name: 'Aprobados',
                                url: '',
                                icon: 'ReceiptForward',
                                key: EnumModules.ApprovedArchivist,
                                onClick: (ev?: React.MouseEvent<HTMLElement>, item?: INavLink) => {
                                  onClickMenu(item.key);                            
                                }
                              },
                              {
                                name: 'Rechazados',
                                url: '',
                                icon: 'ReceiptCheck',
                                key: EnumModules.RejectedArchivist,
                                onClick: (ev?: React.MouseEvent<HTMLElement>, item?: INavLink) => {
                                  onClickMenu(item.key);
                                }
                              }
                            ],
                            isExpanded: true
                          }
                        ],
                        isExpanded: true
                      },
                      {
                        name: 'Préstamos',
                        url: '',
                        links: [
                          {
                            name: 'Buscar',
                            icon: 'FabricFolderSearch',
                            url: '',
                            key: EnumModules.SearchLending,
                            onClick: (ev?: React.MouseEvent<HTMLElement>, item?: INavLink) => {
                              onClickMenu(item.key); 
                            }
                          },
                          {
                            name: 'Solicitudes enviadas',
                            url: '',
                            icon: 'ReceiptForward',
                            key: EnumModules.RequestLending,
                            onClick: (ev?: React.MouseEvent<HTMLElement>, item?: INavLink) => {
                              onClickMenu(item.key);                            
                            }
                          },
                          {
                            name: 'Solicitudes recibidas',
                            url: '',
                            icon: 'ReceiptCheck',
                            key: EnumModules.ReceivedLending,
                            onClick: (ev?: React.MouseEvent<HTMLElement>, item?: INavLink) => {
                              onClickMenu(item.key);
                            }
                          },
                          {
                            name: 'Devoluciones',
                            url: '',
                            icon: 'ReturnToSession',
                            key: EnumModules.PaybackLending,
                            onClick: (ev?: React.MouseEvent<HTMLElement>, item?: INavLink) => {
                              onClickMenu(item.key);                            
                            }
                          },
                          {
                            name: 'Préstamos',
                            url: '',
                            icon: 'WorkItemBug',
                            key: EnumModules.LendLending,
                            onClick: (ev?: React.MouseEvent<HTMLElement>, item?: INavLink) => {
                              onClickMenu(item.key);                            
                            }
                          },
                          {
                            name: 'Reportes',
                            url: '',
                            icon: 'CRMReport',
                            key: EnumModules.ReportLending,
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
                getComponent(menu)
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