import React from 'react';
import styles from './styles.css';
import Icon from 'components/Icon';
import EditorButtonGroupTooltip from 'components/EditorButtonGroupTooltip';
import ColorPicker from 'components/ColorPicker';
import FontPicker from 'components/FontPicker';


function EditorButtonGroup({ buttons }) {
  return (
    <ul className={styles.editorButtonGroup}>
      {buttons.map((each) => {
        switch (each.type) {
          case 'color':
            return (
              <ColorPicker
                key={each.type}
                onChange={each.onChange}
              />
              );
          case 'font':
            return (
              <FontPicker
                key={each.type}
                onChange={each.onChange}
              />
            );
          default:
            return (
              <li
                key={each.type}
              >
                <div className={styles.editorButtonContainer}>
                  <EditorButtonGroupTooltip
                    text={each.tooltip}
                  />
                  <button
                    onClick={each.onClick}
                  >
                    <Icon
                      type={each.type}
                    />
                  </button>
                </div>
              </li>
            );
        }
      })}
    </ul>
  );
}

EditorButtonGroup.propTypes = {
  buttons: React.PropTypes.array,
};


export default EditorButtonGroup;
