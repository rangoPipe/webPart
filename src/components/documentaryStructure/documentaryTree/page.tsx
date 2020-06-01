
import * as React from "react";
import { SubspaceProvider } from "react-redux-subspace";

import { Navbar, Nav, Form, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faFolderOpen } from '@fortawesome/free-solid-svg-icons';

import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import Button from '../../../general/button';
import { IDocumentaryTreeProps } from "./IDocumentaryTree";

import "./style.css";
import { IStore } from "../../../redux/namespace";
import { TypeFolderEnum, IDocumentary } from "../../../common/documentary/documentaryTree/documentaryTreeEnum";

export default function Page(props:IDocumentaryTreeProps) {
    const  { fondo, seccion, subseccion, serie, subserie, onSelectTreeItem } = props;
    
    return (
        <div id="DocumentaryTree">
            <Card>
                <Card.Header>
                    <Navbar expand="lg">
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                                <SubspaceProvider mapState={(state: IStore) => { return { button: state.btnFondoDocumentary }; }} >
                                    <Button />
                                </SubspaceProvider>
                                <SubspaceProvider mapState={(state: IStore) => { return { button: state.btnSeccionDocumentary }; }} >
                                    <Button />
                                </SubspaceProvider>
                                <SubspaceProvider mapState={(state: IStore) => { return { button: state.btnSubseccionDocumentary }; }} >
                                    <Button />
                                </SubspaceProvider>
                                <SubspaceProvider mapState={(state: IStore) => { return { button: state.btnSerieDocumentary }; }} >
                                    <Button />
                                </SubspaceProvider>
                                <SubspaceProvider mapState={(state: IStore) => { return { button: state.btnSubserieDocumentary }; }} >
                                    <Button />
                                </SubspaceProvider>
                            </Nav>
                            <Form inline>
                                <SubspaceProvider mapState={(state: IStore) => { return { button: state.btnTipoDocumentary }; }} >
                                    <Button />
                                </SubspaceProvider>
                            </Form>
                        </Navbar.Collapse>
                    </Navbar>
                </Card.Header>
                <Card.Body>
                    <TreeView  defaultCollapseIcon={<FontAwesomeIcon icon={faFolderOpen} />} defaultExpandIcon={<FontAwesomeIcon icon={faFolder} />} >
                        {
                            fondo.map((iFondo) => {
                                return  (<TreeItem nodeId={ "F" + iFondo.ID  } label={ `${TypeFolderEnum.Fondo}: ${iFondo.Title}` } onClick={()=> onSelectTreeItem(iFondo, TypeFolderEnum.Fondo)}  >
                                        {
                                            filterItem(seccion, iFondo.ID, TypeFolderEnum.Fondo ).map((iSeccion) => {
                                                return <TreeItem nodeId={ "S" + iSeccion.ID  } label={ `${TypeFolderEnum.Seccion}: ${iSeccion.Title}` }  onClick={()=> onSelectTreeItem(iSeccion, TypeFolderEnum.Seccion, iFondo.ID)}  >
                                                        {
                                                            filterItem(subseccion, iSeccion.ID, TypeFolderEnum.Seccion ).map((iSubseccion) => {
                                                                return <TreeItem nodeId={ "SS" + iSubseccion.ID  } label={ `${TypeFolderEnum.Subseccion}: ${iSubseccion.Title}` }  onClick={()=> onSelectTreeItem(iSubseccion, TypeFolderEnum.Subseccion, iSeccion.ID)} >
                                                                        {
                                                                            filterItem(serie, iSubseccion.ID, TypeFolderEnum.Subseccion ).map((iSerie) => {
                                                                                return <TreeItem nodeId={ "SE" + iSerie.ID  } label={ `${TypeFolderEnum.Serie}: ${iSerie.Title}` }  onClick={()=> onSelectTreeItem(iSerie, TypeFolderEnum.Serie, iSubseccion.ID)}  > 
                                                                                {
                                                                                    filterItem(subserie, iSerie.ID, TypeFolderEnum.Serie ).map((iSubserie) => {
                                                                                        return <TreeItem nodeId={ "SSE" + iSubserie.ID  } label={ `${TypeFolderEnum.Subserie}: ${iSubserie.Title}` } onClick={()=> onSelectTreeItem(iSubserie, TypeFolderEnum.Subserie, iSerie.ID )}  > 
                                                                                        
                                                                                        </TreeItem>;
                                                                                    })
                                                                                }
                                                                                </TreeItem>;
                                                                            })
                                                                        }
                                                                    </TreeItem>;
                                                            })
                                                        }
                                                        {
                                                            filterItem(serie, iSeccion.ID, TypeFolderEnum.Seccion ).map((iSerie) => {
                                                                return <TreeItem nodeId={ "SE" + iSerie.ID  } label={ `${TypeFolderEnum.Serie}: ${iSerie.Title}` }  onClick={()=> onSelectTreeItem(iSerie, TypeFolderEnum.Serie, iSeccion.ID)}  > 
                                                                {
                                                                    filterItem(subserie, iSerie.ID, TypeFolderEnum.Serie ).map((iSubserie) => {
                                                                        return <TreeItem nodeId={ "SSE" + iSubserie.ID  } label={ `${TypeFolderEnum.Subserie}: ${iSubserie.Title}` } onClick={()=> onSelectTreeItem(iSubserie, TypeFolderEnum.Subserie, iSerie.ID)}  > 
                                                                        
                                                                        </TreeItem>;
                                                                    })
                                                                }
                                                                </TreeItem>;
                                                            })
                                                        }
                                                    </TreeItem>;
                                            })
                                        }
                                    </TreeItem>);
                            })
                        }
                    </TreeView>
                </Card.Body>
            </Card>
        </div>
    );
}

function filterItem(items:IDocumentary[],value: string, type:TypeFolderEnum ):IDocumentary[] {
    if(items.length === 0)
    {
        return items;
    }
    return items.filter((x:any) => {
        if(!x[type]){
            return false;
        }
        return (x[type].ID === value);
    });
}