
import * as React from "react";
import { Card , Container, Row, Col } from "react-bootstrap";
import { IDocumentaryFormProps } from "./IDocumentaryForm";
import { SubspaceProvider } from "react-redux-subspace";
import { IStore } from "../../../redux/namespace";

import Control from "../../../general/control";
import Button from "../../../general/button";
import Select from "../../../general/select";
import Check from "../../../general/check";
import "./style.css";

export default function Page(props:IDocumentaryFormProps) {
    const { activeView } = props; 
    return (
        <div id="DocumentaryForm">
            <Card>
                <Card.Body>
                    <h3>Agregar { activeView }</h3>
                    <Container fluid={true}>
                        <Row>
                            <Col md={12}>
                                <SubspaceProvider mapState={(state: IStore) => { return { control: state.txtCodigoDocumentaryForm }; }} >
                                    <Control />
                                </SubspaceProvider>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <SubspaceProvider mapState={(state: IStore) => { return { control: state.txtNombreDocumentaryForm }; }} >
                                    <Control />
                                </SubspaceProvider>
                            </Col>
                        </Row>
                    </Container>
                    <Container fluid={true} className="mt-5">
                        <Row>
                            <Col md={12}>
                                <SubspaceProvider mapState={(state: IStore) => { return { select: state.lstSecurityDocumentaryForm }; }} >
                                    <Select />
                                </SubspaceProvider>
                            </Col>
                        </Row>
                    </Container>
                    <Container fluid={true} className="mt-5">
                        <Row>
                            <Col md={12}>
                                <SubspaceProvider mapState={(state: IStore) => { return { select: state.lstGestionDocumentaryForm }; }} >
                                    <Select />
                                </SubspaceProvider>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <SubspaceProvider mapState={(state: IStore) => { return { select: state.lstCentralDocumentaryForm }; }} >
                                    <Select />
                                </SubspaceProvider>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <SubspaceProvider mapState={(state: IStore) => { return { select: state.lstHistoryDocumentaryForm }; }} >
                                    <Select />
                                </SubspaceProvider>
                            </Col>
                        </Row>
                    </Container>
                    <Container fluid={true} className="mt-5">
                        <Row>
                            <Col md={12}>
                                <SubspaceProvider mapState={(state: IStore) => { return { check: state.chkKeepDocumentaryForm }; }} >
                                    <Check />
                                </SubspaceProvider>
                                <SubspaceProvider mapState={(state: IStore) => { return { check: state.chkSelectDocumentaryForm }; }} >
                                    <Check />
                                </SubspaceProvider>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <SubspaceProvider mapState={(state: IStore) => { return { check: state.chkDigitizeDocumentaryForm }; }} >
                                    <Check />
                                </SubspaceProvider>
                                <SubspaceProvider mapState={(state: IStore) => { return { check: state.chkDeleteDocumentaryForm }; }} >
                                    <Check />
                                </SubspaceProvider>
                            </Col>
                        </Row>
                    </Container>
                </Card.Body>
                <Card.Footer>
                    <Container>
                        <Row>
                            <SubspaceProvider mapState={(state: IStore) => { return { button: state.btnSaveDocumentaryForm }; }} >
                                <Button />
                            </SubspaceProvider>
                            <SubspaceProvider mapState={(state: IStore) => { return { button: state.btnCancelDocumentaryForm }; }} >
                                <Button />
                            </SubspaceProvider>
                        </Row>
                    </Container>
                </Card.Footer>
            </Card>
        </div>
    );
}