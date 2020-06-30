import * as React from "react";
import { Container, Card } from "react-bootstrap";
import { SubspaceProvider } from "react-redux-subspace";
import { IStore } from "../../../redux/namespace";
import './style.css';
import Grid from "../../../general/grid";

import Checkbox from '@material-ui/core/Checkbox';
import { FormControlLabel } from "@material-ui/core";
import { IAdminListProps } from "./IAdminList";

export default function Page(props:IAdminListProps) {

    return (
        <div id="admin-list" className="mb-5">
            <Card id="admin-list-first-card">
                <Card.Header>
                  <FormControlLabel control={ <Checkbox checked={ props.allSelected }/> }  label="Seleccionar todo" />
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