
import * as React from "react";
import { Container, Row, Col, Card, Button, Navbar, Nav, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faChevronRight, faFolder, faFolderOpen } from '@fortawesome/free-solid-svg-icons'
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';

import "./style.css";
export default function Page() {
    return (
        <Container fluid={true}>
            <Row>
                <Col xs md={12}>
                    <Card>
                        <Card.Header>
                            <Navbar expand="lg">
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
                        <TreeView
                            defaultCollapseIcon={<FontAwesomeIcon icon={faFolderOpen} color="#FFE588" />}
                            defaultExpandIcon={<FontAwesomeIcon icon={faFolder} color="#FFE588" />}
                            >
                            <TreeItem nodeId="1" label="Applications" >
                                <TreeItem nodeId="2" label="Calendar" />
                                <TreeItem nodeId="3" label="Chrome" />
                                <TreeItem nodeId="4" label="Webstorm" />
                            </TreeItem>
                            <TreeItem nodeId="5" label="Documents">
                                <TreeItem nodeId="10" label="OSS" />
                                <TreeItem nodeId="6" label="Material-UI">
                                <TreeItem nodeId="7" label="src">
                                    <TreeItem nodeId="8" label="index.js" />
                                    <TreeItem nodeId="9" label="tree-view.js" />
                                </TreeItem>
                                </TreeItem>
                            </TreeItem>
                            </TreeView>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>);
}