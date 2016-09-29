import { take, call, put, fork, cancel, select } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { uploadBase64File } from 'utils/upload';
import { UPLOAD_IMAGE_INIT, CLICK_ADDTOCART } from './constants';
import { uploadImageSuccess, uploadImageError, clickAddToCartSuccess } from './actions';
import { selectCurrentProduct, selectOrderQuantityData } from './selectors';
import { addItemToCart } from 'containers/Cart/actions';

function* uploadImage(action) {
  const responseData = yield call(uploadBase64File, action.payload);
  if (!responseData.error) {
    yield put(uploadImageSuccess(responseData.url));
  } else {
    yield put(uploadImageError(responseData.error));
  }
}

function* addToCartFlow(orderData) {
  const currentProduct = yield select(selectCurrentProduct());
  const currentProductOrderData = yield select(selectOrderQuantityData());
  if (currentProductOrderData.entrySeq().reduce((current, each) => {
    if (each[0].indexOf('add') === -1 && Number(each[1]) > 0) {
      return true;
    }
    return current;
  }, false)) {
    const addToCartProduct = {
      product: {
        name: currentProduct.name,
        price: currentProduct.price,
        image: currentProduct.image,
        variant: currentProduct.currentVariant || currentProduct.defaultVariant,
      },
      orderData: currentProductOrderData,
      orderPrice: orderData.priceData,
      orderProductJSON: orderData.currentProductJSON,
    };
    yield put(addItemToCart(addToCartProduct));
    yield put(clickAddToCartSuccess());
  } else {
    console.log('empty order');
  }
}

function* uploadWatcher() {
  while (true) {
    const action = yield take(UPLOAD_IMAGE_INIT);
    yield call(uploadImage, action);
  }
}

function* clickAddToCartWatcher() {
  while (true) {
    const { payload } = yield take(CLICK_ADDTOCART);
    yield call(addToCartFlow, payload);
  }
}

export function* uploadRoot() {
  const uploadWatcherFromRoot = yield fork(uploadWatcher);
  const clickAddToCartFromRoot = yield fork(clickAddToCartWatcher);

  yield take(LOCATION_CHANGE);
  yield cancel(uploadWatcherFromRoot);
  yield cancel(clickAddToCartFromRoot);
}

export default [
  uploadRoot,
];
