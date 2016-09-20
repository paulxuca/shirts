import React from 'react';
import styles from './styles.css';
import Icon from 'components/Icon';

function EditorButtonGroup({ buttons }) {
  return (
    <ul className={styles.editorButtonGroup}>
      {buttons.map((each) =>
        <li
          key={each.type}
        >
          <button>
            <Icon
              type={each.type}
            />
          </button>
        </li>)}
    </ul>
  );
}

EditorButtonGroup.propTypes = {
  buttons: React.PropTypes.array,
};


export default EditorButtonGroup;
