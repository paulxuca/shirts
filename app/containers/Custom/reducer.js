import {
  CHANGE_TAB_TL,
  CHANGE_TAB_LL,
  SELECT_NEW_PRODUCT,
  SELECT_NEW_PRODUCT_COLOR,
} from './constants';
import {
  fromJS,
} from 'immutable';


const initialState = fromJS({
  currentTopLevelTab: 'apparel',
  currentLowLevelTab: 'sweater',
  currentSelectedProduct: false,
});

export default function customReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_TAB_TL:
      return state.set('currentTopLevelTab', action.payload);
    case CHANGE_TAB_LL:
      return state.set('currentLowLevelTab', action.payload);
    case SELECT_NEW_PRODUCT:
      return state.set('currentSelectedProduct', action.payload);
    case SELECT_NEW_PRODUCT_COLOR:
      return state.set('currentSelectedProduct', { ...state.get('currentSelectedProduct'), image: action.payload });
    default:
      return state;
  }
}
