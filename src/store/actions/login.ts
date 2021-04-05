import { createActionCreators } from 'immer-reducer';
import firebase from 'firebase';

import { LoginReducer } from '@/store/reducers/login';
import Tokens from '@/utils/local-storage/tokens';
import { AsyncAction } from './common';
import { userActions } from './user';

export const loginActions = createActionCreators(LoginReducer);

export type LoginActions =
  | ReturnType<typeof loginActions.setIsPending>
  | ReturnType<typeof loginActions.setIsResolved>
  | ReturnType<typeof loginActions.setIsRejected>
  | ReturnType<typeof loginActions.setErrorMsg>;

export const signInAsync = (email: string, password: string): AsyncAction => async (
  dispatch,
  _,
  { firebaseApi },
) => {
  try {
    dispatch(loginActions.setIsPending());

    const { user } = await firebaseApi.logIn({ email, password });

    saveTokens(user);

    const userData = await firebaseApi.getUser();

    dispatch(loginActions.setIsResolved());
    dispatch(userActions.setIsLoggedIn());
    dispatch(userActions.setUser(userData));
  } catch (e) {
    dispatch(loginActions.setErrorMsg(e.message));
    dispatch(loginActions.setIsRejected());
  }
};

export const signUpAsync = (
  email: string,
  password: string,
  username?: string,
  avatarUrl?: string,
): AsyncAction => async (
  dispatch,
  _,
  { firebaseApi },
) => {
  try {
    dispatch(loginActions.setIsPending());

    const { user, additionalUserInfo } = await firebaseApi.signUp({ email, password });

    await saveTokens(user);

    const isNewUser = additionalUserInfo?.isNewUser || false;

    if (isNewUser) await firebaseApi.postUser({ username, avatarUrl });

    const userData = await firebaseApi.getUser();

    dispatch(loginActions.setIsResolved());
    dispatch(userActions.setIsLoggedIn());
    dispatch(userActions.setUser(userData));
  } catch (e) {
    dispatch(loginActions.setErrorMsg(e.message));
    dispatch(loginActions.setIsRejected());
  }
};

export const uploadAvatarAsync = (file: File): AsyncAction => async (dispatch, _, { firebaseApi }) => {
  try {
    dispatch(loginActions.setIsPending());

    const task = await firebaseApi.postAvatar(file);

    dispatch(loginActions.setIsResolved());
    dispatch(userActions.setUserAvatar('userData'));
  } catch (e) {
    dispatch(loginActions.setErrorMsg(e.message));
    dispatch(loginActions.setIsRejected());
  }
};

export const getUsersAsync = (): AsyncAction => async (dispatch, _, { mainApi }) => {
  try {
    dispatch(loginActions.setIsPending());

    const users = await mainApi.getUsers();

    console.log(users);

    dispatch(loginActions.setIsResolved());
    dispatch(userActions.setUserAvatar('userData'));
  } catch (e) {
    dispatch(loginActions.setErrorMsg(e.message));
    dispatch(loginActions.setIsRejected());
  }
};

export const postUserAsync = (): AsyncAction => async (dispatch, _, { mainApi }) => {
  try {
    dispatch(loginActions.setIsPending());

    const user = { username: 'new' };

    await mainApi.postUser(user);

    dispatch(loginActions.setIsResolved());
    dispatch(userActions.setUserAvatar('userData'));
  } catch (e) {
    dispatch(loginActions.setErrorMsg(e.message));
    dispatch(loginActions.setIsRejected());
  }
};

export const saveTokens = async (user: firebase.User | null) => {
  const tokens = Tokens.getInstance();

  const accessToken = await user?.getIdToken();
  const refreshToken = user?.refreshToken;

  if (accessToken) tokens.setAccessToken(accessToken);
  if (refreshToken) tokens.setRefreshToken(refreshToken);
};
