import React from 'react';
import styles from './styles.css';
/*
This is the worst function I've ever
written probably if you see this please
tell Paul Xu at paulxuca@gmail.com to
shoot himself in the foot.
*/

function returnRowData(data) {
  return data.orderData.entrySeq().reduce((total, each, i) => {
    const headerRow = total[0];
    const dataRow = total[1];
    if (each[0] !== 'addNames' && each[0] !== 'addNumbers') {
      headerRow.push(
        <td
          key={i}
          style={{
            textTransform: 'uppercase',
          }}
        >
          {each[0]}
          <hr
            style={{
              width: 30,
              left: 0,
              height: 2,
              backgroundColor: 'black',
              border: 'none',
              margin: '5px 0px',
            }}
          />
        </td>
      );
      dataRow.push(
        <td
          key={i}
          style={{
            fontSize: 14,
            fontWeight: 500,
          }}
        >
          {each[1]}{each[1] > 1 ? 'pcs' : 'pc'}.
        </td>
      );
      return [headerRow, dataRow];
    }
    return total;
  }, [[], []]);
}

function CartItem({ data }) {
  const rowData = returnRowData(data);
  return (
    <div className={styles.cartItem}>
      <div className={styles.cartItemDetails}>
        <div className={styles.cartItemContainer}>
          <span className={styles.cartItemName}>{data.product.name}</span>
          <div className={styles.cartDetailsTable}>
            <table className={styles.tableCart}>
              <tbody>
                <tr>
                  {rowData[0]}
                </tr>
                <tr>
                  {rowData[1]}
                </tr>
              </tbody>
            </table>
          </div>
          <div className={styles.costContainer}>
            <span className={styles.costContainerPrice}>${data.orderPrice}</span>
          </div>
        </div>
      </div>
      <div
        className={styles.cartItemPicture}
        style={{
          backgroundImage: `url(${data.product.image})`,
        }}
      />
    </div>
  );
}

CartItem.propTypes = {
  data: React.PropTypes.object,
};

export default CartItem;
