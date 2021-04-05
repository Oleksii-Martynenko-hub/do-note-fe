import { createActionCreators } from 'immer-reducer';
import { UserReducer } from '@/store/reducers/user';
import Tokens from '@/utils/local-storage/tokens';
import { AsyncAction } from './common';

export const userActions = createActionCreators(UserReducer);

export type UserActions =
  | ReturnType<typeof userActions.setIsLoggedIn>
  | ReturnType<typeof userActions.setIsLoggedOut>
  | ReturnType<typeof userActions.setIsNewUser>
  | ReturnType<typeof userActions.setUserId>
  | ReturnType<typeof userActions.setUserAvatar>
  | ReturnType<typeof userActions.setUser>
  | ReturnType<typeof userActions.reset>;

export const logoutAsync = (): AsyncAction => async (dispatch, _, { firebaseApi }) => {
  const tokens = Tokens.getInstance();

  tokens.clear();

  firebaseApi.logOut();

  dispatch(userActions.reset());
};

export const addNotesAsync = (): AsyncAction => async (dispatch, _, { firebaseApi }) => {
  firebaseApi.addNotes();
};
