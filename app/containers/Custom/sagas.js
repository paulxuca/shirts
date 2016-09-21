import { take, call, put, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { uploadBase64File } from 'utils/upload';
import { UPLOAD_IMAGE_INIT } from './constants';
import { uploadImageSuccess, uploadImageError } from './actions';

function* uploadImage(action) {
  const responseData = yield call(uploadBase64File, action.payload);
  if (!responseData.error) {
    yield put(uploadImageSuccess(responseData.url));
  } else {
    yield put(uploadImageError(responseData.error));
  }
}

function* uploadWatcher() {
  while (true) {
    const action = yield take(UPLOAD_IMAGE_INIT);
    yield call(uploadImage, action);
  }
}

export function* uploadRoot() {
  const uploadWatcherFromRoot = yield fork(uploadWatcher);

  yield take(LOCATION_CHANGE);
  yield cancel(uploadWatcherFromRoot);
}

export default [
  uploadRoot,
];
