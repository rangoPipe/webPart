
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
import { TypeFolderEnum } from "../../../common/documentary/documentaryTree/documentaryTreeEnum";

export default function Page(props:IDocumentaryTreeProps) {
    const  { fondo, seccion, subseccion, serie, subserie } = props;
    buildStructure(props);
    createTree(fondo);
    
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
                    <TreeView
                        defaultCollapseIcon={<FontAwesomeIcon icon={faFolderOpen} />}
                        defaultExpandIcon={<FontAwesomeIcon icon={faFolder} />}
                    >

                        {
                            fondo.map((f) => {
                                return  (<TreeItem nodeId={ "F" + f.ID  } label={ `${TypeFolderEnum.Fondo}: ${f.Title}` }  >
                                        {
                                            filterItem(seccion, f.ID, TypeFolderEnum.Fondo ).map((s) => {
                                                return <TreeItem nodeId={ "S" + s.ID  } label={ `${TypeFolderEnum.Seccion}: ${s.Title}` }  >
                                                        {
                                                            filterItem(subseccion, s.ID, TypeFolderEnum.Seccion ).map((ss) => {
                                                                return <TreeItem nodeId={ "SS" + ss.ID  } label={ `${TypeFolderEnum.Subseccion}: ${ss.Title}` }  >
                                                                        {
                                                                            filterItem(serie, ss.ID, TypeFolderEnum.Subseccion ).map((se) => {
                                                                                return <TreeItem nodeId={ "SE" + se.ID  } label={ `${TypeFolderEnum.Serie}: ${se.Title}` }  > 
                                                                                {
                                                                                    filterItem(subserie, se.ID, TypeFolderEnum.Serie ).map((sse) => {
                                                                                        return <TreeItem nodeId={ "SSE" + sse.ID  } label={ `${TypeFolderEnum.Subserie}: ${sse.Title}` } onClick={()=>{ console.log(sse); }}  > 
                                                                                        
                                                                                        </TreeItem>
                                                                                    })
                                                                                }
                                                                                </TreeItem>
                                                                            })
                                                                        }
                                                                    </TreeItem>
                                                            })
                                                        }
                                                    </TreeItem>
                                            })
                                        }
                                    </TreeItem>)
                            })
                        }
                        
                    </TreeView>
                </Card.Body>
            </Card>
        </div>
    );
}

function filterItem(items:any[],value: string, type:TypeFolderEnum ):any[] {
    if(items.length === 0)
    {
        return items;
    }
    return items.filter((x:any) => x[type].ID === value);
}

function buildStructure(props: IDocumentaryTreeProps ){

    props.serie.forEach( (se) => {
        if(props.subserie)
            se[TypeFolderEnum.Subserie] = props.subserie.filter(sse => sse[TypeFolderEnum.Serie].ID === se.ID )
    });

    props.subseccion.forEach( (se) => {
        if(props.serie)
            se[TypeFolderEnum.Serie] = props.serie.filter(sse => sse[TypeFolderEnum.Subseccion].ID === se.ID )
    });

    props.seccion.forEach( (se) => {
        if(props.subseccion)
        se[TypeFolderEnum.Subseccion] = props.subseccion.filter(sse => sse[TypeFolderEnum.Seccion].ID === se.ID )
    });

    props.fondo.forEach( (se) => {
        if(props.seccion)
        se[TypeFolderEnum.Seccion] = props.seccion.filter(sse => sse[TypeFolderEnum.Fondo].ID === se.ID )
    });
}

function createTree(fondo){
    console.log(fondo);
}