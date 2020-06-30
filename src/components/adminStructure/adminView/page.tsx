import * as React from "react";
import { Container, Row, Card, Col } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faImage, faMinusCircle, faPlusCircle, faRedo, faExpand } from '@fortawesome/free-solid-svg-icons';

import { IAdminViewProps } from "./IAdminView";
import './style.css';

import Viewer from "../../../general/viewer";
import { SubspaceProvider } from "react-redux-subspace";
import { IStore } from "../../../redux/namespace";

export default function Page(props:IAdminViewProps) {
    const {  } = props; 
    return (
        <div id="admin-view" className="mb-5">
            <Card id="admin-view-first-card">
                <Card.Header>
                    <Row>
                        <Col md={9} sm={12}>
                            <FontAwesomeIcon icon={faImage}  /> Image_name.png
                        </Col>
                        <Col md={3} sm={12} className="text-right">
                            <Row>
                                <Col md={3}>
                                    <FontAwesomeIcon icon={faMinusCircle} className="clickable" /> 
                                </Col>
                                <Col md={3}>
                                    <FontAwesomeIcon icon={faPlusCircle}  className="clickable"  /> 
                                </Col>
                                <Col md={3}>
                                    <FontAwesomeIcon icon={faRedo}  className="clickable" /> 
                                </Col>
                                <Col md={3}>
                                    <FontAwesomeIcon icon={faExpand} className="clickable"  /> 
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