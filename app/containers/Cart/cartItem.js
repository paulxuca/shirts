import React from 'react';
import styles from './styles.css';

function CartItem({ data }) {
  console.log(data);
  return (
    <div className={styles.cartItem}>
      <div className={styles.cartItemDetails}>
        <div className={styles.cartItemContainer}>
          <span className={styles.cartItemName}>{data.product.name}</span>
        </div>
      </div>
      <div
        className={styles.cartItemPicture}
        style={{
          backgroundImage: `url(${data.product.image})`,
        }}
      >

      </div>
    </div>
  );
}

CartItem.propTypes = {
  data: React.PropTypes.object,
};

export default CartItem;
