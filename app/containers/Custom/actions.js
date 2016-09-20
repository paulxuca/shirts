import {
  CHANGE_TAB_TL,
  CHANGE_TAB_LL,
  SELECT_NEW_PRODUCT,
  SELECT_NEW_PRODUCT_COLOR,
} from './constants';

export function selectNewProductColor(newProductColor) {
  return {
    type: SELECT_NEW_PRODUCT_COLOR,
    payload: newProductColor,
  };
}

export function selectNewProduct(newProduct) {
  return {
    type: SELECT_NEW_PRODUCT,
    payload: newProduct,
  };
}

export function changeLowLevelTab(newTab) {
  return {
    type: CHANGE_TAB_LL,
    payload: newTab,
  };
}

export function changeTopLevelTab(newTab) {
  return {
    type: CHANGE_TAB_TL,
    payload: newTab,
  };
}
