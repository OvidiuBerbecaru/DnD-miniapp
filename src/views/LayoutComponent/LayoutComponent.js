import React from 'react';
import GridLayout from 'react-grid-layout';

const LayoutComponent = ({ gridPointWidth, gridPointHeight, onDragStart }) => {
  const layout = [{
    i: `${gridPointWidth}-${gridPointHeight}`,
    x: 0,
    y: 0,
    w: gridPointWidth,
    h: gridPointHeight,
  }];

  return (
    <div className="layout-component-card">
      <GridLayout className="layout" layout={layout} cols={12} rowHeight={10} width={220} isDraggable={false}>
        <div
          key={layout[0].i}
          className="layout-component-item d-flex justify-content-center align-items-center"
          draggable
          onDragStart={() => onDragStart(gridPointWidth, gridPointHeight)}
        >
          {`${gridPointWidth}/${gridPointHeight}`}
        </div>
      </GridLayout>
    </div>
  )
}

export default LayoutComponent;