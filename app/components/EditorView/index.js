import React from 'react';
import styles from './styles.css';
import CanvasEditor from 'components/CanvasEditor';
import EditorButtonGroup from 'components/EditorButtonGroup';


class EditorView extends React.Component {
  constructor() {
    super();
    this.onSelectFile = this.onSelectFile.bind(this);
    this.onKeyDownOnCanvas = this.onKeyDownOnCanvas.bind(this);
  }

  componentDidMount() {
    document.getElementById('hiddenFileUpload').addEventListener('change', this.onSelectFile);
    document.body.addEventListener('keydown', this.onKeyDownOnCanvas, { passive: true });
  }

  componentWillReceiveProps(nP) {
    if (nP.newestImageUploadUrl !== this.props.newestImageUploadUrl) {
      this.canvasContainer.addNewImageElement(nP.newestImageUploadUrl);
    }
  }

  componentWillUnmount() {
    document.getElementById('hiddenFileUpload').removeEventListener('change', this.onSelectFile);
    document.body.addEventListener('keydown', this.onKeyDownOnCanvas, { passive: true });
  }

  onRequestJSON() {
    return this.canvasContainer.toJSON();
  }

  onClearCanvas() {
    this.canvasContainer.clearCanvas();
  }

  onKeyDownOnCanvas(e) {
    if (e.keyCode === 8 || e.keyCode === 46) {
      this.canvasContainer.deleteActiveObject();
    }
  }

  onClickFileUpload() {
    document.getElementById('hiddenFileUpload').click();
  }

  onSelectFile(e) {
    const fileReader = new FileReader();

    fileReader.addEventListener('load', () => {
      this.props.onImageUpload(e.target.files[0].name, fileReader.result);
    });

    if (e.target.files[0]) {
      fileReader.readAsDataURL(e.target.files[0]);
    }
  }

  selectNewcolor(nC) {
    const { image, name } = this.props.data.variants.find((each) => each.name === nC);
    this.props.selectNewColor(image, name);
  }

  renderEditorView() {
    return (
      <div className={styles.editorViewElement}>
        <div className={styles.customContainer__editorControls}>
          <EditorButtonGroup
            buttons={[{
              type: 'arrowUp',
              tooltip: 'Move Layer forwards',
              onClick: () => this.canvasContainer.sendObjectForward(),
            }, {
              type: 'arrowDown',
              tooltip: 'Move Layer backwards',
              onClick: () => this.canvasContainer.sendObjectBackward(),
            }, {
              type: 'trashBin',
              tooltip: 'Delete selected element',
              onClick: () => this.canvasContainer.deleteActiveObject(),
            }]}
          />
          <EditorButtonGroup
            buttons={[{
              type: 'plus',
              tooltip: 'Add Text',
              onClick: () => this.canvasContainer.addTextElement(),
            }, {
              type: 'upload',
              tooltip: 'Upload image',
              onClick: () => this.onClickFileUpload(),
            },
            ]}
          />
          <EditorButtonGroup
            buttons={[
              {
                type: 'font',
                onChange: (newFontFamily) => this.canvasContainer.onChangeFontFamily(newFontFamily),
              }, {
                type: 'color',
                onChange: (color) => this.canvasContainer.onChangeTextColor(color),
              },
            ]}
          />
          <input
            type="file"
            className={styles.hiddenFileUpload}
            id="hiddenFileUpload"
            accept="image/*"
          />
        </div>
        <div className={styles.previewContainer}>
          <div className={styles.editorViewClothing}>
            <div className={styles.editorViewClothingContainer}>
              <div
                className={styles.clothingCanvas}
                style={{
                  backgroundImage: `url(${this.props.data.image})`,
                }}
              >
                <div
                  id="canvasContainer"
                  className={styles.canvasContainer}
                >
                  <CanvasEditor
                    ref={(canvas) => {
                      this.canvasContainer = canvas;
                    }}
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
                  <button
                    onClick={() => this.selectNewcolor(each.name)}
                    key={each.name}
                  >
                    <div
                      className={styles.eachColorDot}
                      style={{
                        backgroundColor: each.name,
                      }}
                    />
                  </button>
                )}
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
  selectNewColor: React.PropTypes.func,
  onImageUpload: React.PropTypes.func,
  newestImageUploadUrl: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.bool,
  ]),
};


export default EditorView;
