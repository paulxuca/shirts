import React from 'react';
import {
  selectTopLevelTab,
  selectLowLevelTab,
  selectCurrentProduct,
  selectNewestUploadedImage,
  selectOrderQuantityData,
  selectIsFetching,
  selectDidAddToCartSucceed,
} from './selectors';
import {
  changeTopLevelTab,
  changeLowLevelTab,
  selectNewProduct,
  selectNewProductColor,
  uploadImageInit,
  changeOrderQuantity,
  clickAddToCart,
} from './actions';
import {
  lowLevelTabs,
  topLevelTabs,
  apparelTypes,
} from './mock';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import SelectionTab from 'components/SelectionTab';
import ClothingListItem from 'components/ClothingListItem';
import EditorView from 'components/EditorView';
import QuoteForm from 'components/QuoteForm';
import Loading from 'react-loading-bar';
import styles from './styles.css';

class Custom extends React.Component {
  componentWillReceiveProps(nP) {
    if (nP.addToCartSuccess) {
      this.editor.onClearCanvas();
    }
  }


  renderTopLevelTabs() {
    return topLevelTabs.map((each) =>
      <SelectionTab
        tabType="topLevel"
        key={each.id}
        type={each.id}
        children={each.name}
        isSelected={this.props.topLevelTab === each.id}
        onClick={this.props.changeTopLevelTab}
      />);
  }

  renderLowerLevelTabs() {
    return lowLevelTabs[this.props.topLevelTab].map((each) =>
      <SelectionTab
        tabType="lowLevel"
        key={each.id}
        type={each.id}
        children={each.name}
        isSelected={this.props.lowLevelTab === each.id}
        onClick={this.props.changeLowLevelTab}
      />);
  }

  renderClothingItems() {
    return apparelTypes[this.props.lowLevelTab] && apparelTypes[this.props.lowLevelTab].map((each) =>
      <ClothingListItem
        key={each.name}
        data={each}
        onClickProduct={(newProduct) => this.props.selectNewProduct(newProduct)}
      />
    );
  }

  renderDetailView() {
    return (
      <QuoteForm
        productData={this.props.currentProduct}
        sizeData={this.props.orderQuantityData}
        onChangeAmount={this.props.changeOrderQuantity}
        onClickAddToCart={(tableData, priceData) => {
          const currentProductJSON = this.editor.onRequestJSON();
          this.props.clickAddToCart(tableData, priceData, currentProductJSON);
        }}
      />
    );
  }

  renderContentContainer() {
    switch (this.props.topLevelTab) {
      case 'apparel':
        return this.renderClothingItems();
      case 'element':
        return null;
      case 'detail':
        return this.renderDetailView();
      default:
        return null;
    }
  }

  render() {
    return (
      <div className={styles.customContainer}>
        <Loading
          show={this.props.isFetching}
          color="red"
        />
        <div className={styles.customContainerContent}>
          <div className={styles.customContainer__editor}>
            <div className={styles.customContainer__editorWindow}>
              <div className={styles.customContainer__editorWindowContainer}>
                <div className={styles.containerTabContainer}>
                  {this.renderTopLevelTabs()}
                </div>
                {lowLevelTabs[this.props.topLevelTab] ?
                  <div className={styles.containerSubContainer}>
                    {this.renderLowerLevelTabs()}
                  </div>
                : null
                }
                <div
                  className={styles.containerItemsContainer}
                  style={{
                    padding: this.props.topLevelTab !== 'detail' ? 20 : 0,
                  }}
                >
                    {this.renderContentContainer()}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.customContainer__preview}>
            {this.props.currentProduct ?
              <EditorView
                data={this.props.currentProduct}
                selectNewColor={this.props.selectNewProductColor}
                onImageUpload={(fileName, imageData) => this.props.uploadImageInit(fileName, imageData)}
                newestImageUploadUrl={this.props.newestUploadedImage}
                ref={(editorView) => {
                  this.editor = editorView;
                }}
              />
              :
              null}
          </div>
        </div>
      </div>
    );
  }
}

Custom.propTypes = {
  topLevelTab: React.PropTypes.string,
  lowLevelTab: React.PropTypes.string,
  changeTopLevelTab: React.PropTypes.func,
  changeLowLevelTab: React.PropTypes.func,
  currentProduct: React.PropTypes.oneOfType([
    React.PropTypes.bool,
    React.PropTypes.object,
  ]),
  selectNewProduct: React.PropTypes.func,
  selectNewProductColor: React.PropTypes.func,
  uploadImageInit: React.PropTypes.func,
  changeOrderQuantity: React.PropTypes.func,
  newestUploadedImage: React.PropTypes.oneOfType([
    React.PropTypes.bool,
    React.PropTypes.string,
  ]),
  orderQuantityData: React.PropTypes.object,
  isFetching: React.PropTypes.bool,
  clickAddToCart: React.PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  topLevelTab: selectTopLevelTab(),
  lowLevelTab: selectLowLevelTab(),
  currentProduct: selectCurrentProduct(),
  newestUploadedImage: selectNewestUploadedImage(),
  orderQuantityData: selectOrderQuantityData(),
  isFetching: selectIsFetching(),
  addToCartSuccess: selectDidAddToCartSucceed(),
});

function mapActionsToProps(dispatch) {
  return {
    changeOrderQuantity: (size, newValue) => dispatch(changeOrderQuantity(size, newValue)),
    changeTopLevelTab: (newTab) => dispatch(changeTopLevelTab(newTab)),
    changeLowLevelTab: (newTab) => dispatch(changeLowLevelTab(newTab)),
    selectNewProduct: (newProduct) => dispatch(selectNewProduct(newProduct)),
    selectNewProductColor: (image, name) => dispatch(selectNewProductColor(image, name)),
    uploadImageInit: (fileName, imageData) => dispatch(uploadImageInit(fileName, imageData)),
    clickAddToCart: (tableData, priceData, currentProductJSON) => {
      dispatch(clickAddToCart(tableData, priceData, currentProductJSON));
    },
  };
}

export default connect(mapStateToProps, mapActionsToProps)(Custom);
