import HttpClient from './HttpClient';

export const API_URL = 'https://api.gdeeto.com';

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

  // public getLocation = (id: string) => this.instance.get<ILocation>(`/locations/${id}`);

  public uploadImage = (formData: FormData) => this.instance.post<{ id: string }>('/images', formData);
}

export default MainApi;
