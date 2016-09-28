import React from 'react';
import styles from './styles.css';
import Icon from 'components/Icon';
import EditorButtonGroupTooltip from 'components/EditorButtonGroupTooltip';
import { fonts } from './mock';


class FontPicker extends React.Component {
  constructor() {
    super();
    this.state = {
      fontPickerOpen: false,
    };
    this.onClickEditor = this.onClickEditor.bind(this);
    this.toggleClosePicker = this.toggleClosePicker.bind(this);
  }

  componentDidMount() {
    document.body.addEventListener('click', this.onClickEditor);
  }

  componentWillUnmount() {
    document.body.addEventListener('click', this.onClickEditor);
  }

  onClickEditor(e) {
    if (this.fontPicker && !this.fontPicker.contains(e.target) && this.state.fontPickerOpen) {
      this.toggleClosePicker();
    }
  }

  toggleClosePicker() {
    this.setState({
      fontPickerOpen: false,
    });
  }

  renderFontPicker() {
    return (
      <div className={styles.fontPickerDropdown}>
        <ul
          className={styles.fontList}
          ref={(fontPicker) => {
            this.fontPicker = fontPicker;
          }}
        >
          {fonts.map((each) =>
            <li
              key={each}
              style={{
                fontFamily: each,
              }}
            >
              <button onClick={() => this.props.onChange(each)}>
              {each}
              </button>
            </li>
          )}
        </ul>
      </div>
    );
  }

  render() {
    return (
      <li
        className={styles.fontPickerLI}
      >
        <div className={styles.editorButtonContainer}>
          <EditorButtonGroupTooltip
            text="Change text font"
          />
          <button
            onClick={() => this.setState({ fontPickerOpen: !this.state.fontPickerOpen })}
          >
            <Icon
              type="text"
            />
          </button>
        </div>
        <div className={styles.fontPickerContainer}>
            {this.state.fontPickerOpen ? this.renderFontPicker() : null}
        </div>
      </li>
    );
  }
}

FontPicker.propTypes = {
  onChange: React.PropTypes.func,
};

export default FontPicker;
