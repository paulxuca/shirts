import React from 'react';
import styles from './styles.css';
import QuoteFormInput from 'components/QuoteFormInput';
import CheckBoxGroup from 'components/CheckBoxGroup';
import QuoteFormTable from 'components/QuoteFormTable';
import RoundedButton from 'components/RoundedButton';
import quoteFormData from './mock.js';
import { totalEntryCost } from 'utils/cost';

class QuoteForm extends React.Component {

  onChangeValues(newValue, size) {
    this.props.onChangeAmount(size, newValue);
  }

  getTableData() {
    const table = document.querySelector('table[id="customTable"]') && Array.from(document.querySelector('table[id="customTable"]').children[1].children);
    return table && table.map((each) => {
      const childrenArray = each.children;
      const apparelSize = childrenArray[each.children.length - 1].innerHTML;

      let apparelName;
      let apparelNumber;

      if (this.props.sizeData.get('addNames')) {
        apparelName = childrenArray[0].children[0].value;
      }

      if (this.props.sizeData.get('addNumbers')) {
        apparelNumber = childrenArray[this.props.sizeData.get('addNames') ? 1 : 0].children[0].value;
      }

      return {
        apparelSize,
        apparelName,
        apparelNumber,
      };
    });
  }

  renderOrderForm() {
    const { productData, sizeData } = this.props;
    return (
      <div className={styles.quoteForm}>
        <div className={styles.quoteFormHeader}>
          <span className={styles.productNameHeader} style={{ margin: 0 }}>{quoteFormData.orderDetailsHeader}</span>
          <span className={styles.productName}>{productData.name}</span>
        </div>
        <div className={styles.quoteFormScroll}>
          <div className={styles.quoteFormContainer}>
            <span className={styles.productNameHeader}>{quoteFormData.orderSizes}</span>
            <span className={styles.personalizationPrice}>{quoteFormData.pickSize}</span>
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
              <span className={styles.productNameHeader}>{quoteFormData.personalizationOptions}</span>
              <div
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  display: 'flex',
                }}
              >
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
            </div>
            {sizeData.get('addNames') || sizeData.get('addNumbers') ?
              <div className={styles.personalizationOptions}>
                <span className={styles.productNameHeader}>Personalization Details</span>
                <span className={styles.personalizationPrice}>Enter your full list of names and numbers for accurate pricing</span>
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
                flex: 1,
              }}
            >
              <span className={styles.productNameHeader}>Subtotal</span>
              <span className={styles.totalCostText}>${totalEntryCost(sizeData, productData.price)}</span>
            </div>
            <div
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}
            >
              <RoundedButton
                text="Add to Cart"
                icon="shoppingCart"
                onClick={() => this.props.onClickAddToCart(this.getTableData(), totalEntryCost(sizeData, productData.price))}
              />
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
  onClickAddToCart: React.PropTypes.func,
  sizeData: React.PropTypes.object,
};

export default QuoteForm;
