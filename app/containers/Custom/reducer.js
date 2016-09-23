import {
  CHANGE_TAB_TL,
  CHANGE_TAB_LL,
  SELECT_NEW_PRODUCT,
  SELECT_NEW_PRODUCT_COLOR,
  UPLOAD_IMAGE_SUCCESS,
  UPLOAD_IMAGE_ERROR,
  CHANGE_ORDER_QUANTITY,
} from './constants';
import {
  fromJS,
} from 'immutable';


const initialStateLower = {
  apparel: 'sweater',
  element: 'all',
};

const initialState = fromJS({
  currentTopLevelTab: 'apparel',
  currentLowLevelTab: 'sweater',
  currentSelectedProduct: false,
  newestProductUploaded: false,
  uploadErrors: false,
  orderQuantityData: {
    addNames: false,
    addNumbers: false,
  },
});

export default function customReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_TAB_TL:
      return state
        .set('currentTopLevelTab', action.payload)
        .set('currentLowLevelTab', initialStateLower[action.payload]);
    case CHANGE_TAB_LL:
      return state.set('currentLowLevelTab', action.payload);
    case SELECT_NEW_PRODUCT:
      return state.set('currentSelectedProduct', action.payload);
    case UPLOAD_IMAGE_SUCCESS:
      return state.set('newestProductUploaded', action.payload);
    case UPLOAD_IMAGE_ERROR:
      return state.set('uploadErrors', action.payload);
    case SELECT_NEW_PRODUCT_COLOR:
      return state.set('currentSelectedProduct', { ...state.get('currentSelectedProduct'), image: action.payload });
    case CHANGE_ORDER_QUANTITY:
      return state.set('orderQuantityData', state.get('orderQuantityData').merge(action.payload));
    default:
      return state;
  }
}
