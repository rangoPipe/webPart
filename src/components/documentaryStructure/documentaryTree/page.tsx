
import * as React from "react";
import { SubspaceProvider } from "react-redux-subspace";

import { Navbar, Nav, Form, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faFolderOpen, faFilePdf } from '@fortawesome/free-solid-svg-icons';

import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import Button from '../../../general/button';

import "./style.css";
import { IStore } from "../../../redux/namespace";

export default function Page() {
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
                        
                        <TreeItem nodeId="1" label="Fondo: Fundación Haceb"> 
                            <TreeItem nodeId="1.1" label="Sección: Fundación Haceb" />
                        </TreeItem>
                        <TreeItem nodeId="2" label="Fondo: Haceb"> 
                            <TreeItem nodeId="2.1" label="Sección: Haceb" />
                        </TreeItem>
                        <TreeItem nodeId="3" label="Fondo: Icasa"> 
                            <TreeItem nodeId="3.1" label="Sección: Icasa" />
                        </TreeItem>
                        <TreeItem nodeId="4" label="Fondo: Industrias haceb">
                            <TreeItem nodeId="4.1" label="Sección: DIR Proyectos" />
                            <TreeItem nodeId="4.2" label="Sección: DIR Logistica">
                                <TreeItem nodeId="4.2.1" label="Sub-Sección: Almacén de repuestos">
                                    <TreeItem nodeId="4.2.1.1" label="Serie: Devoluciones">
                                        <TreeItem nodeId="4.2.1.1.1" label="Serie: Devoluciones">
                                            <TreeItem nodeId="4.2.1.1.1.1" label="Expediente">
                                                <TreeItem nodeId="4.2.1.1.1.1.1" label="Devolución_a_proveedores" icon={<FontAwesomeIcon icon={faFilePdf} />} />
                                                <TreeItem nodeId="4.2.1.1.1.1.2" label="Devolución_de_materiales" icon={<FontAwesomeIcon icon={faFilePdf} />} />
                                            </TreeItem>
                                        </TreeItem>
                                    </TreeItem>
                                </TreeItem>
                            </TreeItem>
                        </TreeItem>
                        <TreeItem nodeId="5" label="Fondo: Fedehaceb"> 
                            <TreeItem nodeId="5.1" label="Sección: Fedehaceb" />
                        </TreeItem>
                    </TreeView>
                </Card.Body>
            </Card>
        </div>
    );
}