import React from 'react';
import styles from './styles.css';

function CheckBoxGroup({ onChange, active, children }) {
  return (
    <div className={styles.checkboxGroup}>
      <span
        className={styles.checkbox}
        onClick={onChange}
        role="button"
      >
        {active ? <span className={styles.checkmark} /> : null}
      </span>
      {children}
    </div>
  );
}

CheckBoxGroup.propTypes = {
  children: React.PropTypes.node,
  active: React.PropTypes.bool,
  onChange: React.PropTypes.func,
};

export default CheckBoxGroup;
