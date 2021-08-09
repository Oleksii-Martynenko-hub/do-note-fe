import firebase, { auth, database, storage } from '@/api/firebase';

enum DATABASE {
  ROOT = '/',
  DEFAULT_AVATAR = 'default-avatar',
  USERS = 'users',
  USERS_UID = 'uid',
  USERS_NAME = 'username',
  USERS_EMAIL = 'email',
  USERS_AVATAR = 'avatar_url'
}

enum STORAGE {
  ROOT = '/',
  AVATARS = 'users-avatars/',
  DEFAULT_AVATAR = 'default-avatar.svg'
}

interface ILoginParams {
  email: string;
  password: string;
}

interface ISignUpParams {
  username?: string;
  avatarUrl?: string;
}

interface IGetUserResponse {
  uid: string;
  email: string;
  username: string;
  avatar_url: string;
}

type ILoginResponse = Promise<firebase.auth.UserCredential>;

class FirebaseApi {
  private static classInstance?: FirebaseApi;

  public static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new FirebaseApi();
    }

    return this.classInstance;
  }

  public logIn = ({ email, password }: ILoginParams): ILoginResponse => auth
    .signInWithEmailAndPassword(email, password);

  public signUp = ({ email, password }: ILoginParams): ILoginResponse => auth
    .createUserWithEmailAndPassword(email, password);

  public getUser = (): Promise<IGetUserResponse> => new Promise((resolve, reject) => {
    auth.onAuthStateChanged(
      async (user) => {
        if (user) {
          const userData: IGetUserResponse = await (
            await database.ref(DATABASE.USERS).child(user.uid).get()
          ).val();

          resolve(userData);
          return;
        }
        const error = 'Something went wrong!';
        reject(error);
      },
    );
  });

  public postUser = async ({ username, avatarUrl }: ISignUpParams) => {
    if (auth.currentUser) {
      const { uid, email } = auth.currentUser;
      const newUser = database.ref(DATABASE.USERS).child(uid);
      newUser.child(DATABASE.USERS_UID).set(uid);
      newUser.child(DATABASE.USERS_EMAIL).set(email);
      newUser.child(DATABASE.USERS_NAME).set(username || 'Username');

      const defaultAvatar = await (await database.ref(DATABASE.DEFAULT_AVATAR).get()).val();

      newUser.child(DATABASE.USERS_AVATAR).set(avatarUrl || defaultAvatar);
    }
  };

  public postAvatar = async (file: File) => {
    const upload = storage.child(STORAGE.AVATARS).child('avatar').put(file);
  };

  public addNotes = async () => {
  };

  public logOut = () => auth.signOut();
}

export default FirebaseApi;
