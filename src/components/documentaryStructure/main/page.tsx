import * as React from "react";
import Tree from "../documentaryTree";
import Form from "../documentaryForm";
import { Container, Row, Col } from "react-bootstrap";
import { IMainProps } from "./IMain";

export default function Page(props:IMainProps) {
    const { activeView, onCancel } = props; 
    
    return (
        <Container fluid={true} style={{ height:"100%" }} className="mb-4 mt-4">
            <Row style={{ height:"100%" }}>
                <Col md={(activeView)? 8 : 12}>
                    <Tree />
                </Col>
                {
                    (activeView) 
                    ? <Col md={4} style={{ height:"100%" }}>
                        <Form activeView = {activeView} onCancel = { onCancel }/>
                    </Col>
                    : null
                }
            </Row>
        </Container>
    );
}