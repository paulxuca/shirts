import React from 'react';
import styles from './styles.css';
import QuoteFormInput from 'components/QuoteFormInput';

function calculateOrderCost(items, cost) {
  return items.reduce((totalCost, eachItem) => (Number(eachItem) * cost) + totalCost, 0).toFixed(2);
}

class QuoteForm extends React.Component {
  onChangeValues(newValue, size) {
    this.props.onChangeAmount(size, newValue);
  }

  renderOrderForm() {
    const { productData, sizeData } = this.props;
    return (
      <div className={styles.quoteForm}>
        <div className={styles.quoteFormHeader}>
          <span className={styles.productNameHeader}>Order Details for</span>
          <span className={styles.productName}>{productData.name}</span>
        </div>
        <div className={styles.quoteFormScroll}>
          <div className={styles.quoteFormContainer}>
            <span className={styles.productNameHeader}>Order Sizes</span>
            <div className={styles.quoteFormSizes}>
              {productData.sizes.map((each) =>
                <QuoteFormInput
                  value={sizeData.get(each)}
                  onChange={(e) => this.onChangeValues(e.target.value, each)}
                  size={each}
                  key={each}
                />
              )}
            </div>
            <span className={styles.productNameHeader}>Personalization Options</span>
          </div>
        </div>
        <div className={styles.quoteFormDetails}>
          <div className={styles.quoteFormDetailsContainer}>
            <span className={styles.productNameHeader}>Total Cost</span>
            <span className={styles.totalCostText}>${calculateOrderCost(sizeData, productData.price)}</span>
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
