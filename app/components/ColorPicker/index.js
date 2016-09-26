import React from 'react';
import styles from './styles.css';
import { SketchPicker } from 'react-color';

class ColorPicker extends React.Component {
  constructor() {
    super();
    this.state = {
      colorPickerOpen: false,
      value: '#000',
    };
  }

  componentDidMount() {
    document.body.addEventListener('click', this.onClickOverlay);
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.onClickOverlay);
  }

  onClickOverlay = (e) => {
    if (this.container && !this.container.contains(e.target) && this.state.colorPickerOpen) {
      this.toggleClosePicker();
    }
  }

  onChangeColor = (color) => {
    this.setState({
      value: color,
    });
    this.props.onChange(color.hex);
  }

  toggleClosePicker = () => {
    this.setState({
      colorPickerOpen: false,
    });
  }

  render() {
    return (
      <li className={styles.colorPickerLI}>
        <div className={styles.editorButtonContainer}>
          <button
            onClick={() => this.setState({ colorPickerOpen: !this.state.colorPickerOpen })}
          >
            <div
              className={styles.colorPickerCircle}
              style={{
                backgroundColor: this.state.value.hex,
              }}
            />
          </button>
        </div>
        <div className={styles.colorPickerContainer}>
          <div
            className={styles.colorPickerContainerOverlay}
            ref={(cPContainer) => {
              if (cPContainer) this.container = cPContainer.children[0];
            }}
          >
          {this.state.colorPickerOpen ?
            <SketchPicker
              onChange={this.onChangeColor}
              color={this.state.value.rgb}
            /> :
            null}
          </div>
        </div>
      </li>
    );
  }
}

ColorPicker.propTypes = {
  onChange: React.PropTypes.func,
};

export default ColorPicker;
