import { createSelector, Selector } from 'reselect';
import { State } from '@/store';
import { IUser } from '../reducers/user';

export const selectUserReducer = (state: State) => state.userReducer;

export const selectIsLoggedIn: Selector<State, boolean> = createSelector(
  selectUserReducer,
  ({ isLoggedIn }) => isLoggedIn,
);

export const selectIsNewUser: Selector<State, boolean> = createSelector(
  selectUserReducer,
  ({ isNewUser }) => isNewUser,
);

export const selectUser: Selector<State, IUser> = createSelector(
  selectUserReducer,
  ({ user }) => user,
);

export const selectUserAvatar: Selector<State, string | null> = createSelector(
  selectUser,
  ({ avatar_url }) => avatar_url,
);
