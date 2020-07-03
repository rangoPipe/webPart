import * as React from "react";
import { Row, Col, Container } from "react-bootstrap";
import Checkbox from '@material-ui/core/Checkbox';
import Card from '@material-ui/core/Card';

import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';


import { IGridProps } from "./IGrid";
import { IGridItem, IGridProps as IGrid } from "../../redux/reducers/general/grid/IGrid";
import { FormControlLabel, makeStyles } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";

const UseStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 92,
    },
  });

export default function Page(props: IGridProps) {    
    const { grid, onChange } = props;

    return (
        (grid.hidden)
        ? null
        : <Container>
            { createGrid(grid,) }
            { createPager(grid, onChange) }
          </Container>
    );
}

function createGrid(grid:IGrid) {
  const { items, idPage } = grid;

  let pages = [];
  let cont = 1;
  
  if (items.length === 0) {
    return <h3> Sin elementos</h3>;
  }

  for (let i = 0; i < grid.items.length; i = i+grid.itemsPerPage) {
    pages.push(
      <Row id={`${idPage}${cont}`} 
          style={{display: (cont===1) ? 'flex' : 'none'}}> 
          {createPage(items.slice(i, i+grid.itemsPerPage))}
      </Row> );
    cont++;
  }

  return pages.map( x=> x);
}

function createPage(items:IGridItem[]) {
  const classes = UseStyles();
  return items.map((item:IGridItem) =>
    
      <Col md={6} xs={12} className="mb-3" key={item.id}>
        <Card>
          <Row>
            <Col md={3} className="col-card-action">
              <CardActions>
                  <FormControlLabel control={ 
                    <Checkbox 
                      onClick={ item.onSelect } 
                      checked={ item.selected } 
                      color="default"
                      className="check-grid" /> 
                    } label={ item.label } />
              </CardActions>
            </Col>
            <Col md={8} className="col-card-image" >
              <CardActionArea>
                  <CardMedia className={ classes.media }
                      image={ item.base64 }
                      title={ item.name }
                      onClick={ item.onClick } 
                      />
              </CardActionArea>
            </Col>
          </Row>
        </Card>
      </Col>
  );
}

function createPager(grid:IGrid, onChange) {

  if(grid.itemsPerPage >= grid.items.length ) {
    return null;
  }

  const pages = Math.ceil(grid.items.length / grid.itemsPerPage);
  return  <Row>
            <Col md={12} className="mb-3 mt-3 text-center" >
              <Pagination 
                count={pages} 
                shape="rounded" 
                defaultPage={grid.actualPage} 
                showFirstButton 
                showLastButton
                onChange={(event: React.ChangeEvent<unknown>, value: number) => onChange(value) }  />
            </Col>
          </Row>;
}