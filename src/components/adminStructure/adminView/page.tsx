import * as React from "react";
import { Container, Row, Card, Col } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faMinusCircle, faPlusCircle, faRedo, faExpand } from '@fortawesome/free-solid-svg-icons';

import { IAdminViewProps } from "./IAdminView";
import './style.css';

import Viewer from "../../../general/viewer";
import { SubspaceProvider } from "react-redux-subspace";
import { IStore } from "../../../redux/namespace";

export default function Page(props:IAdminViewProps) {
    const { actionImage, openImage, imageName} = props; 
    return (
        <div id="admin-view" className="mb-5">
            <Card id="admin-view-first-card">
                <Card.Header>
                    <Row>
                        <Col md={8} sm={12}>
                            <FontAwesomeIcon icon={faImage}  /> { imageName }
                        </Col>
                        <Col md={4} sm={12} className="text-right">
                            <Row>
                                <Col md={3}>
                                    <FontAwesomeIcon icon={faMinusCircle} className="clickable" onClick={() => actionImage('[data-key="zoomOut"]')} /> 
                                </Col>
                                <Col md={3}>
                                    <FontAwesomeIcon icon={faPlusCircle}  className="clickable" onClick={() => actionImage('[data-key="zoomIn"]')}  /> 
                                </Col>
                                <Col md={3}>
                                    <FontAwesomeIcon icon={faRedo}  className="clickable" onClick={openImage} /> 
                                </Col>
                                <Col md={3}>
                                    <FontAwesomeIcon icon={faExpand} className="clickable" onClick={openImage}  /> 
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Card.Header>
                <Card.Body>
                    <Container fluid={true} className="mt-5">
                        <Row>
                            <SubspaceProvider mapState={(state: IStore) => { return { viewer: state.viewerAdminView }; }} >
                                <Viewer />
                            </SubspaceProvider>
                        </Row>
                    </Container>
                </Card.Body>
            </Card>
        </div>
    );
}