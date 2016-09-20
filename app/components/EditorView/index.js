import React from 'react';
import styles from './styles.css';
import CanvasEditor from 'components/CanvasEditor';

class EditorView extends React.Component {
  selectNewcolor(nC) {
    const newColorImage = this.props.data.variants.find((each) => each.name === nC).image;
    this.props.selectNewColor(newColorImage);
  }


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
                <CanvasEditor
                  canvasHeight={400}
                  canvasWidth={400}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.editorViewControls}>
          <div className={styles.editorViewControlsContainer}>
              {this.props.data.variants.map((each) =>
                <div
                  key={each.name}
                  className={styles.eachColorDot}
                  style={{
                    backgroundColor: each.name,
                  }}
                  onClick={() => this.selectNewcolor(each.name)}
                />
              )}
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
  selectNewColor: React.PropTypes.func,
};


export default EditorView;


                // <Canvas
                //   width={400}
                //   ref="canvas"
                //   height={400}
                // >
                //   <Image
                //     src="http://i.imgur.com/jZsNUCi.jpg"
                //     width={300}
                //     height={300}
                //     left={0}
                //     top={500}
                //   />
                // </Canvas>