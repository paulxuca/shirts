import React from 'react';
import styles from './styles.css';

function LowLevelTab({ isSelected, onClick, children, type }) {
  return (
    <div
      className={styles.containerTab}
      onClick={() => onClick(type)}
    >
      <p className={isSelected ? styles.textSelected : ''}>{children}</p>
    </div>
  );
}

LowLevelTab.propTypes = {
  isSelected: React.PropTypes.bool,
  onClick: React.PropTypes.func,
  children: React.PropTypes.string,
  type: React.PropTypes.string,
};

export default LowLevelTab;
