import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducer/index';

const store = createStore(
  rootReducer,
  applyMiddleware(thunk),
);

const unsubscribe = store.subscribe(() => {
  console.log('curState', store.getState());
});

console.log(store.getState());

export default store;
