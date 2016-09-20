import React from 'react';
import styles from './styles.css';
import { Canvas, Circle, Image, Path, Text } from 'react-fabricjs';

class EditorView extends React.Component {
  renderEditorView() {
    return (
      <div className={styles.editorViewElement}>
        <div className={styles.editorViewClothing}>
          <div className={styles.editorViewClothingContainer}>
            <div
              className={styles.clothingCanvas}
              style={{
                backgroundImage: `url(${this.props.data.image})`,
              }}
            >
              <div
                className={styles.canvasContainer}
              >
                <Canvas
                  width={400}
                  height={400}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    if (this.props.data) return this.renderEditorView();
    return null;
  }
}

EditorView.propTypes = {
  data: React.PropTypes.oneOfType([
    React.PropTypes.bool,
    React.PropTypes.object,
  ]),
};


export default EditorView;
