import React from 'react';
import styles from './styles.css';

class QuoteForm extends React.Component {
  onChangeValues(newValue, size) {
    this.props.onChangeAmount(size, newValue);
  }

  renderOrderForm() {
    const { productData, sizeData } = this.props;
    return (
      <div className={styles.quoteFormContainer}>
        <div className={styles.quoteForm}>
          <span className={styles.productNameHeader}>Order Details for</span>
          <span className={styles.productName}>{productData.name}</span>
          <div className={styles.quoteFormSizes}>
            {productData.sizes.map((each) =>
              <div className={styles.sizeInputCard} key={each}>
                <div className={styles.sizeInputCardContainer}>
                  <span className={styles.sizeText}>{each}</span>
                  <input
                    type="number"
                    className={styles.orderQuantityInputfield}
                    min="0"
                    value={sizeData[each] || 0}
                    onChange={(e) => this.onChangeValues(e.target.value, each)}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  render() {
    if (this.props.productData) {
      return this.renderOrderForm();
    }
    return null;
  }
}

QuoteForm.propTypes = {
  productData: React.PropTypes.oneOfType([
    React.PropTypes.bool,
    React.PropTypes.object,
  ]),
  onChangeAmount: React.PropTypes.func,
  sizeData: React.PropTypes.object,
};

export default QuoteForm;
