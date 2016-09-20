import React from 'react';
import styles from './styles.css';

function EditorButtonGroup({ buttons }) {
  return (
    <ul className={styles.editorButtonGroup}>
      {buttons.map((each) =>
        <li key={each}>{each}</li>)}
    </ul>
  );
}

export default EditorButtonGroup;
