import React from 'react';
import styles from './styles.css';

function SelectionTab({ tabType, isSelected, onClick, children, type }) {
  return (
    <div
      className={styles[`${tabType}${isSelected && tabType === 'topLevel' ? 'Selected' : ''}`]}
      onClick={() => onClick(type)}
    >
      <p
        className={tabType === 'lowLevel' && isSelected ? styles.lowLevelSelected : ''}
      >{children}</p>
    </div>
  );
}

SelectionTab.propTypes = {
  isSelected: React.PropTypes.bool,
  onClick: React.PropTypes.func,
  children: React.PropTypes.string,
  type: React.PropTypes.string,
  tabType: React.PropTypes.string,
};


export default SelectionTab;
