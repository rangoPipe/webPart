import * as React from "react";
import { Container, Card, Col, Row } from "react-bootstrap";
import { SubspaceProvider } from "react-redux-subspace";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import Checkbox from '@material-ui/core/Checkbox';
import { FormControlLabel } from "@material-ui/core";

import { IStore } from "../../../redux/namespace";
import './style.css';
import Grid from "../../../general/grid";


import { IAdminListProps } from "./IAdminList";

export default function Page(props:IAdminListProps) {

    var { onClickSelectAll, allSelected } = props;

    return (
        <div id="admin-list" className="mb-5">
            <Card id="admin-list-first-card">
                <Card.Header>
                    <Row>
                        <Col md={6} sm={12}>
                            <FormControlLabel control={ <Checkbox checked={ allSelected } color="default" onChange={ (e,checked) => onClickSelectAll(checked) } /> }  label={(allSelected) ? "Deseleccionar todo" : "Seleccionar todo"} />
                        </Col>
                        <Col md={6} sm={12} className="text-right">
                            <FontAwesomeIcon icon={faDownload} /> Subir archivo
                        </Col>
                    </Row>
                </Card.Header>
                <Card.Body>
                    <Container>
                          <SubspaceProvider mapState={(state: IStore) => { return { grid: state.gridListAdmin }; }} >
                              <Grid />
                          </SubspaceProvider>
                    </Container>
                </Card.Body>
            </Card>
        </div>
    );
}