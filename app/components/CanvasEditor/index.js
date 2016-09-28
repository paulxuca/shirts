import React from 'react';
const fabric = require('fabric').fabric;

class CanvasEditor extends React.Component {
  componentDidMount() {
    this.canvas = new fabric.Canvas('c');
    this.canvas.on({
      'object:selected': this.onSelectTextElement,
    });
  }

  onChangeTextColor(color) {
    const text = this.canvas.getActiveObject();
    if (text) {
      text.set('fill', color);
      this.canvas.renderAll();
    }
  }

  onChangeFontFamily(newFontFamily) {
    const object = this.canvas.getActiveObject();
    if (object) {
      object.fontFamily = newFontFamily;
      this.canvas.renderAll();
    }
  }

  toJSON() {
    return this.canvas.toJSON();
  }

  clearCanvas() {
    this.canvas.clear();
  }

  addNewImageElement(url) {
    fabric.util.loadImage(url, (img) => {
      const legimg = new fabric.Image(img, {
        left: 100,
        top: 100,
        width: img.width / 5,
        height: img.height / 5,
        lockUniScaling: true,
      });
      this.canvas.add(legimg);
      this.canvas.bringToFront(legimg);
      this.canvas.renderAll();
    });
  }

  sendObjectBackward() {
    const object = this.canvas.getActiveObject();
    if (object) {
      object.sendBackwards();
      this.canvas.renderAll();
    }
  }

  sendObjectForward() {
    const object = this.canvas.getActiveObject();
    if (object) {
      object.bringForward();
      this.canvas.renderAll();
    }
  }

  addTextElement() {
    const textElement = new fabric.IText('Hello World', { left: 100, top: 100, lockUniScaling: true });
    this.canvas.add(textElement);
    this.canvas.setActiveObject(textElement);
    textElement.selectAll();
    textElement.enterEditing();
  }

  deleteActiveObject() {
    const activeObject = this.canvas.getActiveObject();
    const activeObjectGroup = this.canvas.getActiveGroup();

    this.canvas.discardActiveGroup();
    if (activeObject) return this.canvas.remove(activeObject);
    if (activeObjectGroup) return activeObjectGroup.getObjects().forEach((each) => this.canvas.remove(each));
    return null;
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
