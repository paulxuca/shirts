import React from 'react';
import styles from './styles.css';
import QuoteFormInput from 'components/QuoteFormInput';
import CheckBoxGroup from 'components/CheckBoxGroup';
import Icon from 'components/Icon';
import QuoteFormTable from 'components/QuoteFormTable';

function calculateOrderCost(items, cost) {
  const totalItems = calculateTotalItems(items);
  const numbersCost = (items.get('addNumbers')) ? (totalItems * 2.5) : 0;
  const namesCost = (items.get('addNames')) ? (totalItems * 4.5) : 0;
  return ((totalItems * cost) + numbersCost + namesCost).toFixed(2);
}

function calculateTotalItems(items) {
  return items.reduce((total, each) => {
    if (typeof each === 'number') {
      return total + Number(each);
    }
    return total;
  }, 0);
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
          <span className={styles.productNameHeader}>Order Details for your</span>
          <span className={styles.productName}>{productData.name}</span>
        </div>
        <div className={styles.quoteFormScroll}>
          <div className={styles.quoteFormContainer}>
            <span className={styles.productNameHeader}>Order Sizes</span>
            <div className={styles.quoteFormSizes}>
              {productData.sizes.map((each) =>
                <QuoteFormInput
                  value={sizeData.get(each)}
                  onChange={(e) => this.onChangeValues(Number(e.target.value), each)}
                  size={each}
                  key={each}
                />
              )}
            </div>
            <div className={styles.personalizationOptions}>
              <span className={styles.productNameHeader}>Personalization Options</span>
              <CheckBoxGroup
                active={sizeData.get('addNames')}
                onChange={() => this.onChangeValues(!sizeData.get('addNames'), 'addNames')}
              >
                <span>Add Names <span className={styles.personalizationPrice}>$4.50 per item</span></span>
              </CheckBoxGroup>
              <CheckBoxGroup
                active={sizeData.get('addNumbers')}
                onChange={() => this.onChangeValues(!sizeData.get('addNumbers'), 'addNumbers')}
              >
                <span>Add Numbers <span className={styles.personalizationPrice}>$2.50 per item</span></span>
              </CheckBoxGroup>
            </div>
            {sizeData.get('addNames') || sizeData.get('addNumbers') ?
              <div className={styles.personalizationOptions}>
                <span className={styles.productNameHeader}>Personalization Details</span>
                <span style={{ color: '#CCC' }}>Enter your full list of names and numbers for accurate pricing</span>
                <QuoteFormTable
                  data={sizeData}
                />
                <span className={styles.productNameHeader}>Personalization Note</span>
                <textarea
                  className={styles.textAreaNotes}
                  placeholder="Include details about names, numbers and design details"
                  value={sizeData.get('personalizationNotes')}
                  onChange={(e) => this.onChangeValues(e.target.value, 'personalizationNotes')}
                />
              </div> : null}
            <div className={styles.personalizationOptions}>
              <span className={styles.productNameHeader}>Additional Notes</span>
              <textarea
                className={styles.textAreaNotes}
                placeholder="Enter notes to our production team"
                value={sizeData.get('additionalNotes')}
                onChange={(e) => this.onChangeValues(e.target.value, 'additionalNotes')}
              />
            </div>
          </div>
        </div>
        <div className={styles.quoteFormDetails}>
          <div className={styles.quoteFormDetailsContainer}>
            <div
              style={{
                flex: 1
              }}
            >
              <span className={styles.productNameHeader}>Total Cost</span>
              <span className={styles.totalCostText}>${calculateOrderCost(sizeData, productData.price)}</span>
            </div>
            <div
              style={{
                flex: 1,
              }}
            >
              <Icon type="shoppingCart" />
            </div>
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
