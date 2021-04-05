import {
  createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from 'redux';

import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';

import FirebaseApi from '@/api/FirebaseApi';

import { LoginActions } from '@/store/actions/login';
import loginReducer from '@/store/reducers/login';

import { RestoreAuthActions } from '@/store/actions/restore-auth';
import restoreAuthReducer from '@/store/reducers/restore-auth';

import { UserActions } from '@/store/actions/user';
import userReducer from '@/store/reducers/user';
import MainApi from '@/api/MainApi';

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  router: connectRouter(history),
  loginReducer,
  restoreAuthReducer,
  userReducer,
});

export const api = {
  firebaseApi: FirebaseApi.getInstance(),
  mainApi: MainApi.getInstance(),
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(
  applyMiddleware(routerMiddleware(history), thunk.withExtraArgument(api)),
);

export type State = ReturnType<typeof rootReducer>;
export type Actions =
  | LoginActions
  | RestoreAuthActions
  | UserActions;

export default createStore(rootReducer, enhancer);
