import React from 'react';
const fabric = require('fabric').fabric;

class CanvasEditor extends React.Component {
  componentDidMount() {
    this.canvas = new fabric.Canvas('c');
  }

  render() {
    return (
      <div>
        <canvas
          id="c"
          height={this.props.canvasHeight}
          width={this.props.canvasWidth}
        />
      </div>
    );
  }
}

CanvasEditor.propTypes = {
  canvasHeight: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
  ]),
  canvasWidth: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
  ]),
};

export default CanvasEditor;
