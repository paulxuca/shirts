import React from 'react';
import styles from './styles.css';
import Icon from 'components/Icon';
import EditorButtonGroupTooltip from 'components/EditorButtonGroupTooltip';


function EditorButtonGroup({ buttons }) {
  return (
    <ul className={styles.editorButtonGroup}>
      {buttons.map((each) =>
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
        </li>)}
    </ul>
  );
}

EditorButtonGroup.propTypes = {
  buttons: React.PropTypes.array,
};


export default EditorButtonGroup;
