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
        <div id="admin-form" className="mb-5">
            <Card className="admin-form-main-card">
                <Card.Body>
                    <Card>
                        <Card.Body>
                            <Container fluid={true} className="mt-5">
                                <fieldset className="scheduler-border">
                                <legend className="scheduler-border"><h3>Buscar Expediente</h3></legend>
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
                                </fieldset>
                            </Container>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Body>
                            
                            <Container fluid={true} className="mt-5">
                                <fieldset className="scheduler-border">
                                <legend className="scheduler-border"><h3>Tipo Documental</h3></legend>
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
                                </fieldset>
                            </Container>
                            
                        </Card.Body>
                        <Card.Footer>
                            <Container>
                                <Row>
                                    <Col md={12}>
                                        <SubspaceProvider mapState={(state: IStore) => { return { button: state.btnSaveAdminForm }; }} >
                                            <Button />
                                        </SubspaceProvider>
                                    </Col>
                                    <Col md={12}>
                                        <SubspaceProvider mapState={(state: IStore) => { return { button: state.btnCancelAdminForm }; }} >
                                            <Button />
                                        </SubspaceProvider>
                                    </Col>
                                </Row>
                            </Container>
                        </Card.Footer>
                    </Card>
                </Card.Body>
            </Card>
        </div>
    );
}