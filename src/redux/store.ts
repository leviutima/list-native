import { configureStore } from '@reduxjs/toolkit';
const createSagaMiddleware = require('redux-saga').default;
import { authReducer } from './reducers/authReducer';
import rootSaga from './sagas/authSaga';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: false,
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
