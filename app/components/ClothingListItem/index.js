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
      <p className={styles.clothingItemPrice}><span style={{ fontSize: 12, fontWeight: 600, verticalAlign: 'top', lineHeight: 2.3, marginRight: 2 }}>$</span>{data.price}</p>
    </li>
  );
}

ClothingListItem.propTypes = {
  onClickProduct: React.PropTypes.func,
  data: React.PropTypes.object,
};

export default ClothingListItem;
