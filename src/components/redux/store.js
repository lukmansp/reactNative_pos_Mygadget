// import {createStore, applyMiddleware, compose} from 'redux';
// import logger from 'redux-logger';
// import promiseMiddleware from 'redux-promise-middleware';
// import {composeWithDevTools} from 'redux-devtools-extension';
// import {persistStore,, persistCombineReducers} from 'redux-persist';
// import storage from 'redux-persist/es/storage';
// import reducers from './reducers';

// // const store = createStore(
// //   reducers,
// //   composeWithDevTools(applyMiddleware(logger, promiseMiddleware)),
// // );

// // export default store;
// const config = {
//   key: 'primary',
//   storage,
// };
// let persistReducer = persistCombineReducers(config, rootReducers);
// export default () => {
//   let store = createStore(persistedReducer);
//   let persistor = persistStore(store);
//   return {
//     store,
//     persistor,
//   };
// };
import AsyncStorage from '@react-native-community/async-storage';
import {createStore, applyMiddleware, compose} from 'redux';
import {createLogger} from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware';
import {persistStore, persistReducer} from 'redux-persist';
// import promise from 'redux-promise-middleware';
import reducers from './reducers';

const persistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, reducers);
const logger = createLogger({});
const store = createStore(
  persistedReducer,
  applyMiddleware(logger, promiseMiddleware),
);
let persistor = persistStore(store);
export {store, persistor};
