import {
  CHANGE_TAB_TL,
  CHANGE_TAB_LL,
  SELECT_NEW_PRODUCT,
} from './constants';

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
