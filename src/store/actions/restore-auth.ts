import { createActionCreators } from 'immer-reducer';
import { RestoreAuthReducer } from '@/store/reducers/restore-auth';
import Tokens from '@/utils/local-storage/tokens';
import { AsyncAction } from './common';
import { userActions } from './user';

export const restoreAuthActions = createActionCreators(RestoreAuthReducer);

export type RestoreAuthActions =
  | ReturnType<typeof restoreAuthActions.setIsPending>
  | ReturnType<typeof restoreAuthActions.setIsResolved>
  | ReturnType<typeof restoreAuthActions.setIsRejected>;

export const restoreAuthAsync = (): AsyncAction => async (dispatch, _, { firebaseApi }) => {
  try {
    const tokens = Tokens.getInstance();

    const accessToken = tokens.getAccessToken();

    if (!accessToken) return;

    dispatch(restoreAuthActions.setIsPending());

    const user = await firebaseApi.getUser();

    dispatch(restoreAuthActions.setIsResolved());
    dispatch(userActions.setIsLoggedIn());
    dispatch(userActions.setUser(user));
  } catch (e) {
    dispatch(restoreAuthActions.setIsRejected());
  }
};
