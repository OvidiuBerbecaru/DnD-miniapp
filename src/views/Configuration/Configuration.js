import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import GridLayout from 'react-grid-layout';
import { Button } from '@material-ui/core';
import LayoutComponent from '../LayoutComponent/LayoutComponent';
import { updateLayout } from '../../ducks/actions';
import { prepend, reject, where, includes } from 'ramda'

const components = [
  {
    gridPointWidth: 12,
    gridPointHeight: 2,
  },
  {
    gridPointWidth: 6,
    gridPointHeight: 4,
  },
  {
    gridPointWidth: 12,
    gridPointHeight: 4,
  },
]

const addCompomentToLayout = ({ width, height, currentLayout, index, newId }) => {
  return prepend(
    { i: `${ index }-${ newId }`, x: 0, y: 0, w: width, h: height }, 
    currentLayout,
  );
}

const Configuration = (props) => {
  const { location, records, updateLayout, history } = props

  const index = location.search.split("?")[1];
  const initialLayout = records[index].layout;

  const [currentLayout, setCurrentLayout] = useState([]);
  const [droppedElementProps, setDroppedElementProps] = useState({});
  const [newId, setNewId] = useState();

  useEffect(() => {
    setCurrentLayout(records[index].layout);
    setNewId(parseInt(records[index].layout.length + 1))
  },[records, index])

  const onReset = () => {
    setCurrentLayout(initialLayout);
  }

  const onSave = () => {
    updateLayout({ index: parseInt(index), layout: currentLayout })
    history.push("/");
  }

  const onDelete = (id) => {
    setCurrentLayout(
      reject(where({ i: includes(id) }))(currentLayout)
    );
  }

  const onDragStart = (gridPointWidth, gridPointHeight) => {
    setDroppedElementProps({
      gridPointWidth,
      gridPointHeight
    })
  }

  const onDragOver = (event) => {
    event.preventDefault();
  }

  const onDrop = () => {
    setNewId(newId + 1);

    setCurrentLayout(addCompomentToLayout({
      width: droppedElementProps.gridPointWidth,
      height: droppedElementProps.gridPointHeight,
      currentLayout,
      index,
      newId,
    }));

    setDroppedElementProps({})
  }

  return(
    <div className="configuration">
      <div className="sidebar">
        <h2>Components</h2>
        {
          components.map(({ gridPointWidth, gridPointHeight}) => (
            <LayoutComponent gridPointWidth={gridPointWidth} gridPointHeight={gridPointHeight} onDragStart={onDragStart} key={`${gridPointWidth}--${gridPointHeight}`}/>
          ))
        }
        <p>drop the components into the configuration screen</p>
      </div>
      <div className="configuration-screen">
        <p className="config">Configuration</p>
        <p className="screen">Screen</p>
        <div className="d-flex justify-content-center">
          <Button
              size="large"
              variant="contained"
              onClick={onSave}
              className="button button-save"
            >
            Save
          </Button>
          <Button
            size="small"
            variant="contained"
            onClick={onReset}
            className="button button-reset"
          >
            Reset
          </Button>
        </div>
        <div className="configuration-layout" onDragOver={onDragOver} onDrop={onDrop}>
          <GridLayout
            className="layout"
            layout={currentLayout}
            cols={12}
            rowHeight={70}
            width={900}
            isDraggable={true}
            isResizable
            onLayoutChange={layout => (setCurrentLayout(layout))}
          >
            {
              currentLayout.map(row => (
                <div key={row.i} id={row.i} className="grid-item" onDoubleClick={(event) => {onDelete(event.currentTarget.id)}} />
              ))
            }
          </GridLayout>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  records: state,
});

const mapDispatchToProps = dispatch => ({
  updateLayout: payload => dispatch(updateLayout(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Configuration));