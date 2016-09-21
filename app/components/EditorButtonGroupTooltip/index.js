import React from 'react';
import styles from './styles.css';

function EditorButtonGroupTooltip({ text }) {
  return (
    <span className={styles.buttonToolTip}>
      {text}
    </span>
  );
}

export default EditorButtonGroupTooltip;
