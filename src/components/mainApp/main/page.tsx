import * as React from "react";
import { Container, Row, Col, Navbar, Nav, Form } from "react-bootstrap";
import { IMainProps } from "./IMain";
import { SubspaceProvider } from "react-redux-subspace";
import { IStore } from "../../../redux/namespace";

import Button from '../../../general/button';
import Snackbar from '../../../general/snackbar';
import Structure from '../../documentaryStructure/main';
import Admin from '../../adminStructure/main';
import "./style.css";
import { MainAppViewEnum } from "../../../common/mainApp/main/mainAppContent";

export default function Page(props:IMainProps) {
    const {  } = props; 
    
    return (
        <div>
            <Container fluid={true} style={{ height:"100%" }} className="mb-4" id="MainAppContainer">
                <Row>
                    <Col md={12} className="div-navbar">
                        <Navbar expand="lg">
                            <Navbar.Toggle aria-controls="main-navbar-nav" />
                            <Navbar.Collapse id="main-navbar-nav">
                                <Nav className="mr-auto">
                                    <SubspaceProvider mapState={(state: IStore) => { return { button: state.btnAdminMainApp }; }} >
                                        <Button />
                                    </SubspaceProvider>
                                    <SubspaceProvider mapState={(state: IStore) => { return { button: state.btnStructureMainApp }; }} >
                                        <Button />
                                    </SubspaceProvider>
                                </Nav>
                                <Form inline>
                                    <SubspaceProvider mapState={(state: IStore) => { return { button: state.btnSearchMainApp }; }} >
                                        <Button />
                                    </SubspaceProvider>
                                </Form>
                            </Navbar.Collapse>
                        </Navbar>
                    </Col>
                </Row>
                <Row style={{ height:"100%", color: "#9D9D9D" }}>
                    <Col md={12}>
                        <Container fluid={true} style={{ height:"100%" }} className="mb-4 mt-4" id="MainContentContainer">
                            <Row style={{ height:"100%" }}>
                                <Col md={12}>
                                    {
                                        renderView(props.actualView)
                                    }
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                </Row>
            </Container>
            <SubspaceProvider mapState={(state: IStore) => { return { snackbar: state.appSnackbar }; }} >
                <Snackbar />
            </SubspaceProvider>
        </div>
    );
}

function renderView (type:MainAppViewEnum) {
    switch(type){
        case MainAppViewEnum.Admin:
            return <SubspaceProvider mapState={(state: IStore) => { 
                return {
                    appContext: state.appContext,
                    appSnackbar: state.appSnackbar,

                    gridListAdmin : state.gridListAdmin,
                    btnAdminMainApp: state.btnAdminMainApp,
                    btnSaveAdminForm: state.btnSaveAdminForm,
                    btnCancelAdminForm: state.btnCancelAdminForm,
                    txtSearchAdminForm: state.txtSearchAdminForm,
                    lstTypeAdminForm: state.lstTypeAdminForm,
                    lstDocumentalTypeAdminForm: state.lstDocumentalTypeAdminForm,
                    viewerAdminView: state.viewerAdminView
                 }; 
                }}>
                <Admin />
            </SubspaceProvider>;
        case MainAppViewEnum.Structure:
            return <SubspaceProvider mapState={(state: IStore) => { 
                        return { 
                            appContext: state.appContext,
                            stateMainDocumentary: state.stateMainDocumentary,
                            stateDocumentaryTree: state.stateDocumentaryTree,
                            btnFondoDocumentary: state.btnFondoDocumentary,
                            btnSeccionDocumentary: state.btnSeccionDocumentary,
                            btnSubseccionDocumentary : state.btnSubseccionDocumentary,
                            btnSerieDocumentary : state.btnSerieDocumentary,
                            btnSubserieDocumentary : state.btnSubserieDocumentary,
                            btnTipoDocumentary : state.btnTipoDocumentary,
                            btnSaveDocumentaryForm: state.btnSaveDocumentaryForm,
                            btnCancelDocumentaryForm: state.btnCancelDocumentaryForm,
                            txtIdDocumentaryForm : state.txtIdDocumentaryForm,
                            txtNombreDocumentaryForm : state.txtNombreDocumentaryForm,
                            txtCodigoDocumentaryForm : state.txtCodigoDocumentaryForm,
                            lstCentralDocumentaryForm : state.lstCentralDocumentaryForm,
                            lstHistoryDocumentaryForm : state.lstHistoryDocumentaryForm,
                            lstGestionDocumentaryForm : state.lstGestionDocumentaryForm,
                            lstSecurityDocumentaryForm : state.lstSecurityDocumentaryForm,
                            lstColumnDocumentaryForm: state.lstColumnDocumentaryForm,
                            chkDigitizeDocumentaryForm : state.chkDigitizeDocumentaryForm,
                            chkKeepDocumentaryForm : state.chkKeepDocumentaryForm,
                            chkSelectDocumentaryForm : state.chkSelectDocumentaryForm,
                            chkDeleteDocumentaryForm : state.chkDeleteDocumentaryForm,                            
                        }; 
                    }}>
                        <Structure />
                    </SubspaceProvider>;
        case MainAppViewEnum.Search:
            return <div>Search</div>;
        default:
            return null;
    }
}