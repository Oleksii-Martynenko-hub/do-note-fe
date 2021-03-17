import { createActionCreators } from 'immer-reducer';

import { AsyncAction } from '@/store/actions/common';
import { LoginReducer } from '@/store/reducers/login';

export const loginActions = createActionCreators(LoginReducer);

export type LoginActions =
  | ReturnType<typeof loginActions.setIsPending>
  | ReturnType<typeof loginActions.setIsResolved>
  | ReturnType<typeof loginActions.setIsRejected>;

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const authRestoreAsync = (): AsyncAction => async (dispatch) => {
  try {
    dispatch(loginActions.setIsPending());

    await sleep(2000);

    dispatch(loginActions.setIsResolved());
  } catch (e) {
    dispatch(loginActions.setIsRejected());
  }
};
