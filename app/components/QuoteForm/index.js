import React from 'react';
import styles from './styles.css';
import QuoteFormInput from 'components/QuoteFormInput';
import CheckBoxGroup from 'components/CheckBoxGroup';

function calculateOrderCost(items, cost) {
  const totalItems = items.reduce((total, each) => {
    if (typeof each !== 'boolean') {
      return total + Number(each);
    }
    return total;
  });
  return {
    totalCost: totalItems * cost,
    namesCost: totalItems * 4.5,
    numbersCost: totalItems * 4.5,
  };
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
            <div className={styles.personalizationOptions}>
              <span className={styles.productNameHeader}>Personalization Options</span>
              <CheckBoxGroup
                active={!!sizeData.get('addNames')}
                onChange={() => this.onChangeValues(!sizeData.get('addNames'), 'addNames')}
              >
                <span>Add Names <span className={styles.personalizationPrice}>$4.50 per item</span></span>
              </CheckBoxGroup>
              <CheckBoxGroup
                active={!!sizeData.get('addNumbers')}
                onChange={() => this.onChangeValues(!sizeData.get('addNumbers'), 'addNumbers')}
              >
                <span>Add Numbers <span className={styles.personalizationPrice}>$2.50 per item</span></span>
              </CheckBoxGroup>
            </div>
          </div>
        </div>
        <div className={styles.quoteFormDetails}>
          <div className={styles.quoteFormDetailsContainer}>
            <span className={styles.productNameHeader}>Total Cost</span>
            <span className={styles.totalCostText}>${calculateOrderCost(sizeData, productData.price).totalCost}</span>
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
