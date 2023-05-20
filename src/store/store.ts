import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';

import { reducerCard } from './reducerCard';

const rootReducer = combineReducers({
  reducerCard,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
