import React from 'react';
import { Container, Card, Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import GridLayout from 'react-grid-layout';

const Layouts = (props) => {
  const { records } = props

  return(
      <Container className="layouts d-flex flex-column align-items-center">
        <h1>Layouts</h1>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          {
            records.map((el, index) => (
              <Link
                key={el}
                className="card-link"
                to={{
                  pathname: "/configuration",
                  search: `?${index}`,
                }}
              >
                <Card className="card">
                  <GridLayout className="layout" layout={el.layout} cols={12} rowHeight={30} width={600} isDraggable={false}>
                    {
                      el.layout.map(row => (
                        <div key={row.i} className="grid-item"/>
                      ))
                    }
                  </GridLayout>
                </Card>
                <p className="card-title">
                  {el.name}
                </p>
              </Link>
            ))
          }
        </Grid>
      </Container>
  );
}

const mapStateToProps = state => ({
  records: state,
});

export default connect(mapStateToProps)(Layouts);