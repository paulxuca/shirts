import React from 'react';
import styles from './styles.css';

const appLogo = 'https://s3.amazonaws.com/shirts.qthreads/site_assets/logo.png';

class Navigation extends React.Component {
  render() {
    return (
      <div className={styles.appNavigation}>
        <div className={styles.appNavigationContainer}>
          <div
            className={styles.brandLogo}
            style={{
              backgroundImage: `url(${appLogo})`,
            }}
          />
          <div className={styles.appNavigationItems}>

          </div>
        </div>
      </div>
    );
  }
}

export default Navigation;
