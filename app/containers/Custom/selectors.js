import {
  createSelector,
} from 'reselect';

const selectCustomReducer = () => (state) => state.get('customReducer');

const selectTopLevelTab = () => createSelector(
  selectCustomReducer(),
  (substate) => substate.get('currentTopLevelTab')
);

const selectLowLevelTab = () => createSelector(
  selectCustomReducer(),
  (substate) => substate.get('currentLowLevelTab')
);

const selectCurrentProduct = () => createSelector(
  selectCustomReducer(),
  (substate) => substate.get('currentSelectedProduct')
);

const selectNewestUploadedImage = () => createSelector(
  selectCustomReducer(),
  (substate) => substate.get('newestProductUploaded')
);

const selectOrderQuantityData = () => createSelector(
  selectCustomReducer(),
  (substate) => substate.get('orderQuantityData'),
);

const selectIsFetching = () => createSelector(
  selectCustomReducer(),
  (substate) => substate.get('isFetching'),
);

const selectDidAddToCartSucceed = () => createSelector(
  selectCustomReducer(),
  (substate) => substate.get('addToCartSuccess'),
);

export {
  selectTopLevelTab,
  selectLowLevelTab,
  selectCurrentProduct,
  selectNewestUploadedImage,
  selectOrderQuantityData,
  selectIsFetching,
  selectDidAddToCartSucceed,
};
