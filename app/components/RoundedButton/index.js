import React from 'react';
import Icon from 'components/Icon';
import styles from './styles.css';

function RoundedButton({ onClick, icon, text }) {
  return (
    <span className={styles.buttonWrapper}>
      <button
        onClick={onClick}
      >
        <Icon type={icon} style={{ marginBottom: 3, marginRight: 10 }} />
        {text}
      </button>
    </span>

  );
}

RoundedButton.propTypes = {
  onClick: React.PropTypes.func,
  icon: React.PropTypes.string,
  text: React.PropTypes.string,
};

export default RoundedButton;
