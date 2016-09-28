import {
  CHANGE_TAB_TL,
  CHANGE_TAB_LL,
  SELECT_NEW_PRODUCT,
  SELECT_NEW_PRODUCT_COLOR,
  UPLOAD_IMAGE_ERROR,
  UPLOAD_IMAGE_INIT,
  UPLOAD_IMAGE_SUCCESS,
  CHANGE_ORDER_QUANTITY,
  CLICK_ADDTOCART,
  CLICK_ADDTOCART_ERROR,
  CLICK_ADDTOCART_SUCCESS,
} from './constants';

export function clickAddToCartError(error) {
  return {
    type: CLICK_ADDTOCART_ERROR,
    payload: error,
  };
}

export function clickAddToCartSuccess(newOrderItem) {
  return {
    type: CLICK_ADDTOCART_SUCCESS,
    payload: newOrderItem,
  };
}

export function clickAddToCart(tableData, priceData, currentProductJSON) {
  return {
    type: CLICK_ADDTOCART,
    payload: {
      tableData,
      priceData,
      currentProductJSON,
    },
  };
}

export function changeOrderQuantity(size, newValue) {
  const newSizeObject = {};
  newSizeObject[size] = newValue;
  return {
    type: CHANGE_ORDER_QUANTITY,
    payload: newSizeObject,
  };
}

export function uploadImageInit(fileName, imageData) {
  return {
    type: UPLOAD_IMAGE_INIT,
    payload: {
      fileName,
      imageData,
    },
  };
}

export function uploadImageSuccess(url) {
  return {
    type: UPLOAD_IMAGE_SUCCESS,
    payload: url,
  };
}

export function uploadImageError(error) {
  return {
    type: UPLOAD_IMAGE_ERROR,
    payload: error,
  };
}

export function selectNewProductColor(newImage, newName) {
  return {
    type: SELECT_NEW_PRODUCT_COLOR,
    payload: {
      newImage,
      newName,
    },
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
