import { createReducerFunction, ImmerReducer } from 'immer-reducer';

export type IUser = {
  uid: string | null;
  username: string | null;
  email: string | null;
  avatar_url: string | null;
};

export interface IUserState {
  isLoggedIn: boolean;
  isNewUser: boolean;
  user: IUser
}

const initialState: IUserState = {
  isLoggedIn: false,
  isNewUser: false,
  user: {
    uid: null,
    username: null,
    email: null,
    avatar_url: null,
  },
};

export class UserReducer extends ImmerReducer<IUserState> {
  public setIsLoggedIn() {
    this.draftState.isLoggedIn = true;
  }

  public setIsLoggedOut() {
    this.draftState.isLoggedIn = false;
  }

  public setIsNewUser(isNewUser: boolean) {
    this.draftState.isNewUser = isNewUser;
  }

  public setUser(user: IUser) {
    this.draftState.user = user;
  }

  public setUserId(uid: string) {
    this.draftState.user.uid = uid;
  }

  public setUserAvatar(avatar_url: string) {
    this.draftState.user.avatar_url = avatar_url;
  }

  public reset() {
    this.draftState = initialState;
  }
}

export default createReducerFunction(UserReducer, initialState);
