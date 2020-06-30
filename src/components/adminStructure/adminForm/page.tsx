import * as React from "react";
import { Container, Row, Col, Card, Form } from "react-bootstrap";
import { IAdminFormProps } from "./IAdminForm";
import { SubspaceProvider } from "react-redux-subspace";
import { IStore } from "../../../redux/namespace";

import TextField from "../../../general/textField";
import Select from "../../../general/select";
import Button from "../../../general/button";
import './style.css';

export default function Page(props:IAdminFormProps) {
    const { mainForm } = props; 
    
    return (
        <div id="admin-form">
            <Card id="admin-form-main-card">
                <Card.Body>
                    <Card id="admin-form-first-card" className="mb-5" >
                        <Card.Body>
                            <Container fluid={true} className="mt-4 mb-4">
                                <Row>
                                    <Col md={12}>
                                        <h3>Buscar expediente</h3>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12}>
                                        <SubspaceProvider mapState={(state: IStore) => { return { textField: state.txtSearchAdminForm }; }} >
                                            <TextField />
                                        </SubspaceProvider>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12}>
                                        <SubspaceProvider mapState={(state: IStore) => { return { select: state.lstTypeAdminForm }; }} >
                                            <Select />
                                        </SubspaceProvider>
                                    </Col>
                                </Row>
                            </Container>
                        </Card.Body>
                    </Card>
                    <Card id="admin-form-second-card">
                        <Card.Body>
                            
                            <Container fluid={true} className="mt-4 mb-4">
                                <Row>
                                    <Col md={12}>
                                        <h3>Tipo documental</h3>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12}>
                                        <SubspaceProvider mapState={(state: IStore) => { return { select: state.lstDocumentalTypeAdminForm }; }} >
                                            <Select />
                                        </SubspaceProvider>
                                    </Col>
                                </Row>
                                <Row>
                                    <Form id="main-form-adminForm">
                                        {
                                            mainForm.map(x => {
                                                return <Col md={12}>{x}</Col>;
                                            })
                                        }
                                    </Form>
                                </Row>
                            </Container>
                            
                        </Card.Body>
                        <Card.Footer className="mb-4">
                            <Row>
                                <Col md={6}>
                                    <SubspaceProvider mapState={(state: IStore) => { return { button: state.btnSaveAdminForm }; }} >
                                        <Button />
                                    </SubspaceProvider>
                                </Col>
                                <Col md={6}>
                                    <SubspaceProvider mapState={(state: IStore) => { return { button: state.btnCancelAdminForm }; }} >
                                        <Button />
                                    </SubspaceProvider>
                                </Col>
                            </Row>
                        </Card.Footer>
                    </Card>
                </Card.Body>
            </Card>
        </div>
    );
}