import HttpClient from './HttpClient';

export const API_URL = 'https://my-works-notes-tasks.netlify.app/.netlify/functions/index';

class MainApi extends HttpClient {
  private static classInstance?: MainApi;

  public constructor() {
    super(API_URL);
  }

  public static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new MainApi();
    }

    return this.classInstance;
  }

  public getUsers = () => this.instance.get<any>('/users');

  public postUser = (user: any) => this.instance.post<any>('/add-user', user);
}

export default MainApi;
