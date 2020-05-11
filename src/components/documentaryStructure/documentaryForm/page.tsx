
import * as React from "react";
import { Card, Form, Container, Row, Col } from "react-bootstrap";
import { IDocumentaryFormProps } from "./IDocumentaryForm";
import "./style.css";
import { TypeFolderEnum } from "../../../common/documentary/documentaryTree/documentaryTreeEnum";
import { SubspaceProvider } from "react-redux-subspace";
import { IStore } from "../../../redux/namespace";
import Control from "../../../general/control";
import Button from "../../../general/button";

export default function Page(props:IDocumentaryFormProps) {
    const { activeView } = props; 
    /*const fondo = <div>
        <h3>Agregar Fondo</h3>
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
    </div>;

    const tipodocumental = <div>
        <h3>Agregar tipo documental</h3>
        <Container fluid={true}>
            <Row>
                <Col md={12}>
                    <Form.Control type={"text"} placeholder="Código" className="mt-3" />
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <Form.Control  type={"text"} placeholder="Nombre" className="mt-3" />
                </Col>
            </Row>
        </Container>
    </div>;

    const seccion = <div>
        <Container fluid={true}>
            <h3>Agregar sección</h3>
            <Row>
                <Col md={12}>
                    <Form.Control type={"text"} placeholder="Código" className="mt-3" />
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <Form.Control  type={"text"} placeholder="Nombre" className="mt-3" />
                </Col>
            </Row>
        </Container>
        <Container fluid={true} className="mt-5">
            <h3>Grupos de seguridad</h3>
            <Row>
                <Col md={12}>
                <Form.Control as="select">
                    <option hidden>Lista de grupos</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </Form.Control>
                </Col>
            </Row>
        </Container>
    </div>;

    const subseccion = <div>
        <Container fluid={true}>
        <h3>Agregar subsección</h3>
            <Row>
                <Col md={12}>
                    <Form.Control type={"text"} placeholder="Código" className="mt-3" />
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <Form.Control  type={"text"} placeholder="Nombre" className="mt-3" />
                </Col>
            </Row>
        </Container>
    </div>;

    const serie = <div>
        <Container fluid={true}>
            <h3>Agregar serie</h3>
            <Row>
                <Col md={12}>
                    <Form.Control type={"text"} placeholder="Código" className="mt-3" />
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <Form.Control  type={"text"} placeholder="Nombre" className="mt-3" />
                </Col>
            </Row>
        </Container>
    </div>;

    const subserie = <div>
        <Container fluid={true}>
            <h3>Agregar subserie</h3>
            <Row>
                <Col md={12}>
                    <Form.Control type={"text"} placeholder="Código" className="mt-3" />
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <Form.Control  type={"text"} placeholder="Nombre" className="mt-3" />
                </Col>
            </Row>
        </Container>
        <Container fluid={true} className="mt-5">
            <h3>Tablas de retención documental</h3>
            <Row>
                <Col md={12}>
                <Form.Control as="select" className="mt-3">
                    <option hidden>Tiempo de retención archivos de gestión</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </Form.Control>
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                <Form.Control as="select" className="mt-3">
                    <option hidden>Tiempo de retención de archivos central</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </Form.Control>
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                <Form.Control as="select" className="mt-3">
                    <option hidden>Tiempo de retención de archivos históricos</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </Form.Control>
                </Col>
            </Row>
        </Container>
        <Container fluid={true} className="mt-5">
            <h3>Opciones de disposición final</h3>
            <Row>
                <Col md={12}>
                    <Form.Control type={"text"} placeholder="Código" className="mt-3" />
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <Form.Control  type={"text"} placeholder="Nombre" className="mt-3" />
                </Col>
            </Row>
        </Container>
    </div>;*/

    return (
        <div id="DocumentaryForm">
            <Card>
                <Card.Body>
                    <h3>Agregar Fondo</h3>
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

//<Button variant="outline-dark" className="btn-guardar mr-2" size="lg">Guardar</Button>
//<Button variant="outline-dark" className="btn-cancelar" size="lg" onClick={ props.onCancel }>Cancelar</Button>