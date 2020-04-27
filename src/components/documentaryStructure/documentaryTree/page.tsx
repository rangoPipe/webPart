import * as React from "react";
import { Container, Row, Col, Card, Button, Navbar, Nav, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import "./style.css";
export default function Page() {
    return (
        <Container fluid={true}>
            <Row>
                <Col xs md={12}>
                    <Card>
                        <Card.Header>
                            <Navbar bg="light" expand="lg">
                                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                <Navbar.Collapse id="basic-navbar-nav">
                                    <Nav className="mr-auto">
                                        <Button variant="outline-light"><FontAwesomeIcon icon={faPlus} /> Fondo</Button>
                                        <Button variant="outline-light"><FontAwesomeIcon icon={faPlus} /> Sección</Button>
                                        <Button variant="outline-light"><FontAwesomeIcon icon={faPlus} /> Sub Sección</Button>
                                        <Button variant="outline-light"><FontAwesomeIcon icon={faPlus} /> Serie</Button>
                                        <Button variant="outline-light"><FontAwesomeIcon icon={faPlus} /> Sub Serie</Button>
                                    </Nav>
                                    <Form inline>
                                        <Button variant="outline-light"><FontAwesomeIcon icon={faPlus} /> Tipo Documental</Button>
                                    </Form>
                                </Navbar.Collapse>
                            </Navbar>
                        </Card.Header>
                        <Card.Body>
                            <Card.Title>Special title treatment</Card.Title>
                            <Card.Text>
                                With supporting text below as a natural lead-in to additional content.
                        </Card.Text>
                            <Button variant="primary">Go somewhere</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>);
}