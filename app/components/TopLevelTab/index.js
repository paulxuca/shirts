import React from 'react';
import styles from './styles.css';

function TopLevelTab({ isSelected, onClick, children, type }) {
  return (
    <div
      className={isSelected ? styles.containerTab__selected : styles.containerTab}
      onClick={() => onClick(type)}
    >
      <p>{children}</p>
    </div>
  );
}

TopLevelTab.propTypes = {
  isSelected: React.PropTypes.bool,
  onClick: React.PropTypes.func,
  children: React.PropTypes.string,
  type: React.PropTypes.string,
};

export default TopLevelTab;
