import { call, put, takeLatest } from 'redux-saga/effects';
import { login } from '../../service/auth/login';
import { LOGIN_REQUEST, loginFailure, loginSuccess } from '../actions/authAction';
import * as Sentry from '@sentry/react-native';

function* handleLogin(action: any): any {
  try {
    const user = yield call(login, action.payload);
    yield put(loginSuccess(user));
  } catch (error: any) {
    Sentry.captureMessage(`Tentativa de login para o email: ${action.payload.email}`);
    yield put(loginFailure(error.message));
  }
}

export default function* rootSaga() {
  yield takeLatest(LOGIN_REQUEST, handleLogin);
}
