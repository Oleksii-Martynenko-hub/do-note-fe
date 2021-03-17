import {
  createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from 'redux';

import thunk from 'redux-thunk';

import MainApi from '@/api/MainApi';

import loginReducer from '@/store/reducers/login';
import { LoginActions } from '@/store/actions/login';

const rootReducer = combineReducers({
  loginReducer,
});

export const api = {
  mainApi: MainApi.getInstance(),
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(thunk.withExtraArgument(api)));

export type State = ReturnType<typeof rootReducer>;
export type Actions = LoginActions;

export default createStore(rootReducer, enhancer);
