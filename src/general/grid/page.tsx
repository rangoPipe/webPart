import * as React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Checkbox from '@material-ui/core/Checkbox';
import Card from '@material-ui/core/Card';

import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';


import { IGridProps } from "./IGrid";
import { IGridItem } from "../../redux/reducers/general/grid/IGrid";
import { FormControlLabel, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 100,
    },
  });

export default function Page(props: IGridProps) {    
    const { grid } = props;
    const classes = useStyles();

    return (
        (grid.hidden)
        ? null
        : <Row>{ generate(grid.items, classes) }</Row>
    );
}

function generate(items:IGridItem[],classes) {
    return items.map((item:IGridItem) =>
      <Col md={6} xs={12} className="mb-3">
        <Card>
            <CardActionArea>
                <CardMedia className={ classes.media }
                    image={ item.base64 }
                    title={ item.name }
                    onClick={ item.onClick } 
                    />
                    
            </CardActionArea>
            <CardActions>
                <FormControlLabel control={ <Checkbox onClick={ item.onSelect } checked={ item.selected } /> } label={ item.label } />
            </CardActions>
        </Card>
      </Col>
    );
  }