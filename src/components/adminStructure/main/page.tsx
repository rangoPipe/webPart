import * as React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { IMainProps } from "./IMain";
import { SubspaceProvider } from "react-redux-subspace";
import { IStore } from "../../../redux/namespace";
import Form from "../adminForm";
import List from "../adminList";
import View from "../adminView";
import './style.css';

export default function Page(props:IMainProps) {
    const {  } = props; 
    
    return (
        <div id="main-admin-form">
            <Container fluid={true} className="mb-4 mt-4">
                <Row className="display-flex">
                    <Col md={4}>
                        <SubspaceProvider mapState={(state: IStore) => { 
                                return { 
                                    appContext : state.appContext,
                                    
                                    btnSaveAdminForm : state.btnSaveAdminForm,
                                    btnCancelAdminForm: state.btnCancelAdminForm,
                                    txtSearchAdminForm: state.txtSearchAdminForm,
                                    lstTypeAdminForm: state.lstTypeAdminForm,
                                    lstDocumentalTypeAdminForm: state.lstDocumentalTypeAdminForm,


                                    gridListAdmin: state.gridListAdmin
                                }; 
                            }}>
                            <Form />
                        </SubspaceProvider>
                    </Col>
                    <Col md={4}>
                        <SubspaceProvider mapState={(state: IStore) => { 
                                return { 
                                    appContext : state.appContext,
                                    gridListAdmin: state.gridListAdmin,
                                    viewerAdminView: state.viewerAdminView
                                }; 
                            }}>
                            <List />
                        </SubspaceProvider>
                    </Col>
                    <Col md={4}>
                        <SubspaceProvider mapState={(state: IStore) => { 
                                return {
                                    viewerAdminView: state.viewerAdminView,
                                    viewer: state.viewerAdminView
                                }; 
                            }}>
                            <View />
                        </SubspaceProvider>
                    </Col>
                </Row>
            </Container>
        </div>
        
    );
}