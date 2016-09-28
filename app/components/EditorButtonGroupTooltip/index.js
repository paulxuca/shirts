import React from 'react';
import styles from './styles.css';

function EditorButtonGroupTooltip({ text }) {
  return (
    <span className={styles.buttonToolTip}>
      {text}
    </span>
  );
}

EditorButtonGroupTooltip.propTypes = {
  text: React.PropTypes.string,
};

export default EditorButtonGroupTooltip;
