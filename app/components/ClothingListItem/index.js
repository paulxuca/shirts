import React from 'react';
import styles from './styles.css';

function ClothingListItem({ onClickProduct, data }) {
  return (
    <li
      className={styles.clothingItem}
      onClick={() => onClickProduct(data)}
    >
      <div
        className={styles.clothingItemPicture}
        style={{
          backgroundImage: `url(${data.image})`,
        }}
      ></div>
      <div className={styles.colorDotContainer}>
      {data.variants.map((each) =>
        <div
          key={each.name}
          className={styles.eachColorDot}
          style={{
            backgroundColor: each.name,
          }}
        />
      )}
      </div>
      <p className={styles.clothingItemText}>{data.name}</p>
      <p className={styles.clothingItemPrice}>{data.price}</p>
    </li>
  );
}

ClothingListItem.propTypes = {
  onClickProduct: React.PropTypes.func,
  data: React.PropTypes.object,
};

export default ClothingListItem;
