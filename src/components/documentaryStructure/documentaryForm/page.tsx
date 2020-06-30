
import * as React from "react";
import { Card , Container, Row, Col } from "react-bootstrap";
import { IDocumentaryFormProps } from "./IDocumentaryForm";
import { SubspaceProvider } from "react-redux-subspace";
import { FormControl, FormGroup } from "@material-ui/core";
import { IStore } from "../../../redux/namespace";

import Control from "../../../general/control";
import TextField from "../../../general/textField";
import Button from "../../../general/button";
import Select from "../../../general/select";
import Check from "../../../general/check";
import "./style.css";
import { TypeFolderEnum } from "../../../common/documentary/documentaryTree/documentaryTreeEnum";

export default function Page(props:IDocumentaryFormProps) {
    const { activeView } = props; 
    return (
        <div id="DocumentaryForm" className="mb-5">
            <Card>
                <Card.Body>
                    <SubspaceProvider mapState={(state: IStore) => { return { control: state.txtIdDocumentaryForm }; }} >
                        <Control />
                    </SubspaceProvider>
                    <h3>Agregar { activeView }</h3>
                    <Container fluid={true}>
                        <Row>
                            <Col md={12}>
                                <SubspaceProvider mapState={(state: IStore) => { return { textField: state.txtCodigoDocumentaryForm }; }} >
                                    <TextField />
                                </SubspaceProvider>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <SubspaceProvider mapState={(state: IStore) => { return { textField: state.txtNombreDocumentaryForm }; }} >
                                    <TextField />
                                </SubspaceProvider>
                            </Col>
                        </Row>
                    </Container>
                    {
                        (activeView == TypeFolderEnum.Seccion)
                        ? <div>
                            <Container fluid={true} className="mt-5">
                                <Row>
                                    <Col md={12}>
                                        <SubspaceProvider mapState={(state: IStore) => { return { select: state.lstSecurityDocumentaryForm }; }} >
                                            <Select />
                                        </SubspaceProvider>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                        : null
                    }
                    {
                        (activeView == TypeFolderEnum.Subserie)
                        ? <div>
                            <Container fluid={true} className="mt-5">
                                <h3>Tablas de retención documental</h3>
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
                                    <h3>Opciones de disposición final</h3>
                                    <Col md={12}>
                                    <FormControl component="fieldset">
                                        <FormGroup>
                                            <SubspaceProvider mapState={(state: IStore) => { return { check: state.chkKeepDocumentaryForm }; }} >
                                                <Check />
                                            </SubspaceProvider>
                                            <SubspaceProvider mapState={(state: IStore) => { return { check: state.chkSelectDocumentaryForm }; }} >
                                                <Check />
                                            </SubspaceProvider>
                                        </FormGroup>
                                    </FormControl>
                                    <FormControl component="fieldset">
                                        <FormGroup>
                                            <SubspaceProvider mapState={(state: IStore) => { return { check: state.chkDigitizeDocumentaryForm }; }} >
                                                <Check />
                                            </SubspaceProvider>
                                            <SubspaceProvider mapState={(state: IStore) => { return { check: state.chkDeleteDocumentaryForm }; }} >
                                                <Check />
                                            </SubspaceProvider>
                                        </FormGroup>
                                    </FormControl>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                        :null
                    }
                    {
                        (activeView == TypeFolderEnum.TipoDocumental)
                        ? <div>
                            <Container fluid={true}>
                                <Row>
                                    <Col md={12}>
                                        <SubspaceProvider mapState={(state: IStore) => { return { select: state.lstColumnDocumentaryForm }; }} >
                                            <Select />
                                        </SubspaceProvider>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                        :null
                    }
                    
                </Card.Body>
                <Card.Footer>
                    <Container>
                        <Row>
                            <Col md={6}>
                                <SubspaceProvider mapState={(state: IStore) => { return { button: state.btnSaveDocumentaryForm }; }} >
                                    <Button />
                                </SubspaceProvider>
                            </Col>
                            <Col md={6}>
                                <SubspaceProvider mapState={(state: IStore) => { return { button: state.btnCancelDocumentaryForm }; }} >
                                    <Button />
                                </SubspaceProvider>
                            </Col>
                        </Row>
                    </Container>
                </Card.Footer>
            </Card>
        </div>
    );
}