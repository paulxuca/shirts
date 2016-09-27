import { take, call, put, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { uploadBase64File } from 'utils/upload';
import { UPLOAD_IMAGE_INIT, CLICK_ADDTOCART, } from './constants';
import { uploadImageSuccess, uploadImageError } from './actions';

function* uploadImage(action) {
  const responseData = yield call(uploadBase64File, action.payload);
  if (!responseData.error) {
    yield put(uploadImageSuccess(responseData.url));
  } else {
    yield put(uploadImageError(responseData.error));
  }
}

function* addToCartFlow(tableData) {
  console.log(tableData);
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
