import React from 'react';
import styles from './styles.css';
import { Canvas, Circle, Image, Path, Text } from 'react-fabricjs';

class EditorView extends React.Component {
  render() {
    return (
      <div className={styles.editorViewElement}>
        <div className={styles.editorViewClothing}>
          <div
            className={styles.clothingCanvas}
            style={{
              backgroundImage: `url(${this.props.data.image})`,
            }}
          >
            <Canvas
              style={{

              }}
              width={300}
              height={500}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default EditorView;
