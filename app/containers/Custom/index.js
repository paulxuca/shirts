import React from 'react';
import {
  selectTopLevelTab,
  selectLowLevelTab,
  selectCurrentProduct,
  selectNewestUploadedImage,
  selectOrderQuantityData,
} from './selectors';
import {
  changeTopLevelTab,
  changeLowLevelTab,
  selectNewProduct,
  selectNewProductColor,
  uploadImageInit,
  changeOrderQuantity,
} from './actions';
import {
  lowLevelTabs,
  topLevelTabs,
  apparelTypes,
} from './mock';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import TopLevelTab from 'components/TopLevelTab';
import LowLevelTab from 'components/LowLevelTab';
import ClothingListItem from 'components/ClothingListItem';
import EditorView from 'components/EditorView';
import QuoteForm from 'components/QuoteForm';
import styles from './styles.css';

class Custom extends React.Component {
  renderTopLevelTabs() {
    return topLevelTabs.map((eachTLTab) =>
      <TopLevelTab
        key={eachTLTab.id}
        type={eachTLTab.id}
        children={eachTLTab.name}
        isSelected={this.props.topLevelTab === eachTLTab.id}
        onClick={(newTab) => this.props.changeTopLevelTab(newTab)}
      />);
  }

  renderLowerLevelTabs() {
    return lowLevelTabs[this.props.topLevelTab].map((each) =>
      <LowLevelTab
        key={each.id}
        type={each.id}
        children={each.name}
        isSelected={this.props.lowLevelTab === each.id}
        onClick={(newTab) => this.props.changeLowLevelTab(newTab)}
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
              <div className={styles.containerItemsContainer}>
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
            />
            :
            null}
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
};

const mapStateToProps = createStructuredSelector({
  topLevelTab: selectTopLevelTab(),
  lowLevelTab: selectLowLevelTab(),
  currentProduct: selectCurrentProduct(),
  newestUploadedImage: selectNewestUploadedImage(),
  orderQuantityData: selectOrderQuantityData(),
});

function mapActionsToProps(dispatch) {
  return {
    changeOrderQuantity: (size, newValue) => dispatch(changeOrderQuantity(size, newValue)),
    changeTopLevelTab: (newTab) => dispatch(changeTopLevelTab(newTab)),
    changeLowLevelTab: (newTab) => dispatch(changeLowLevelTab(newTab)),
    selectNewProduct: (newProduct) => dispatch(selectNewProduct(newProduct)),
    selectNewProductColor: (nPC) => dispatch(selectNewProductColor(nPC)),
    uploadImageInit: (fileName, imageData) => dispatch(uploadImageInit(fileName, imageData)),
  };
}

export default connect(mapStateToProps, mapActionsToProps)(Custom);
