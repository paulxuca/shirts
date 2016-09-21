import React from 'react';
import {
  selectTopLevelTab,
  selectLowLevelTab,
  selectCurrentProduct,
  selectNewestUploadedImage,
} from './selectors';
import {
  changeTopLevelTab,
  changeLowLevelTab,
  selectNewProduct,
  selectNewProductColor,
  uploadImageInit,
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
import styles from './styles.css';

class Custom extends React.Component {
  render() {
    return (
      <div className={styles.customContainer}>
        <div className={styles.customContainer__editor}>
          <div className={styles.customContainer__editorWindow}>
            <div className={styles.customContainer__editorWindowContainer}>
              <div className={styles.containerTabContainer}>
                {topLevelTabs.map((eachTLTab) =>
                  <TopLevelTab
                    key={eachTLTab.id}
                    type={eachTLTab.id}
                    children={eachTLTab.name}
                    isSelected={this.props.topLevelTab === eachTLTab.id}
                    onClick={(newTab) => this.props.changeTopLevelTab(newTab)}
                  />)}
              </div>
              <div className={styles.containerSubContainer}>
                {lowLevelTabs[this.props.topLevelTab] && lowLevelTabs[this.props.topLevelTab].map((each) =>
                  <LowLevelTab
                    key={each.id}
                    type={each.id}
                    children={each.name}
                    isSelected={this.props.lowLevelTab === each.id}
                    onClick={(newTab) => this.props.changeLowLevelTab(newTab)}
                  />)}
              </div>
              <div className={styles.containerItemsContainer}>
                <ul className={styles.containerItemList}>
                  {apparelTypes[this.props.lowLevelTab] && apparelTypes[this.props.lowLevelTab].map((each) =>
                    <ClothingListItem
                      key={each.name}
                      data={each}
                      onClickProduct={(newProduct) => this.props.selectNewProduct(newProduct)}
                    />
                  )}
                </ul>
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
  newestUploadedImage: React.PropTypes.oneOfType([
    React.PropTypes.bool,
    React.PropTypes.string,
  ]),
};

const mapStateToProps = createStructuredSelector({
  topLevelTab: selectTopLevelTab(),
  lowLevelTab: selectLowLevelTab(),
  currentProduct: selectCurrentProduct(),
  newestUploadedImage: selectNewestUploadedImage(),
});

function mapActionsToProps(dispatch) {
  return {
    changeTopLevelTab: (newTab) => dispatch(changeTopLevelTab(newTab)),
    changeLowLevelTab: (newTab) => dispatch(changeLowLevelTab(newTab)),
    selectNewProduct: (newProduct) => dispatch(selectNewProduct(newProduct)),
    selectNewProductColor: (nPC) => dispatch(selectNewProductColor(nPC)),
    uploadImageInit: (fileName, imageData) => dispatch(uploadImageInit(fileName, imageData)),
  };
}

export default connect(mapStateToProps, mapActionsToProps)(Custom);
