import * as React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { IAdminViewProps } from "./IAdminView";
import './style.css';

import Viewer from "../../../general/viewer";
import { SubspaceProvider } from "react-redux-subspace";
import { IStore } from "../../../redux/namespace";

export default function Page(props:IAdminViewProps) {
    const {  } = props; 
    return (
        <div id="admin-view" className="mb-5">
            <Card>
                <Card.Header>
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