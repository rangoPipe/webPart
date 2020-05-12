import * as React from "react";
import Tree from "../documentaryTree";
import Form from "../documentaryForm";
import { Container, Row, Col } from "react-bootstrap";
import { IMainProps } from "./IMain";
import { SubspaceProvider } from "react-redux-subspace";
import { IStore } from "../../../redux/namespace";

export default function Page(props:IMainProps) {
    const { activeView } = props; 
    
    return (
        <Container fluid={true} style={{ height:"100%" }} className="mb-4 mt-4">
            <Row style={{ height:"100%" }}>
                <Col md={(activeView)? 8 : 12}>
                    <SubspaceProvider mapState={(state: IStore) => { 
                      return {
                            contextDocumentary: state.contextDocumentary,
                            btnFondoDocumentary: state.btnFondoDocumentary,
                            btnSeccionDocumentary: state.btnSeccionDocumentary,
                            btnSubseccionDocumentary : state.btnSubseccionDocumentary,
                            btnSerieDocumentary : state.btnSerieDocumentary,
                            btnSubserieDocumentary : state.btnSubserieDocumentary,
                            btnTipoDocumentary : state.btnTipoDocumentary
                        }; }}>                        
                        <Tree key = { props.key } />
                    </SubspaceProvider>
                </Col>
                {
                    (activeView) 
                    ? <Col md={4} style={{ height:"100%" }}>
                        <SubspaceProvider mapState={(state: IStore) => { 
                            return {
                                stateMainDocumentary: state.stateMainDocumentary,
                                btnSaveDocumentaryForm: state.btnSaveDocumentaryForm,
                                btnCancelDocumentaryForm: state.btnCancelDocumentaryForm,
                                txtNombreDocumentaryForm : state.txtNombreDocumentaryForm,
                                txtCodigoDocumentaryForm : state.txtCodigoDocumentaryForm,
                                lstCentralDocumentaryForm : state.lstCentralDocumentaryForm,
                                lstHistoryDocumentaryForm : state.lstHistoryDocumentaryForm,
                                lstGestionDocumentaryForm : state.lstGestionDocumentaryForm,
                                lstSecurityDocumentaryForm : state.lstSecurityDocumentaryForm,
                                chkDigitizeDocumentaryForm : state.chkDigitizeDocumentaryForm,
                                chkKeepDocumentaryForm : state.chkKeepDocumentaryForm,
                                chkSelectDocumentaryForm : state.chkSelectDocumentaryForm,
                                chkDeleteDocumentaryForm : state.chkDeleteDocumentaryForm
                                }; }}>   
                            <Form activeView = {activeView } key = { props.key } />
                        </SubspaceProvider>
                    </Col>
                    : null
                }
            </Row>
        </Container>
    );
}