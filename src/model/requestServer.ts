import {
  QueryString,
  ObjectString,
} from '../types/type';
import {
  IAggregatedWord,
  IAuth,
  ISetting,
  IStatistic,
  IUser,
  IUserWord,
  IWord,
} from '../types/interface';

export default class ServerRequests {
  public baseUrl: string;

  public path: {
    users: string,
    signin: string,
    words: string,
  };

  constructor() {
    this.baseUrl = 'https://application-learnwords.herokuapp.com';
    this.path = {
      users: '/users',
      signin: '/signin',
      words: '/words',
    };
  }

  generateQueryString(queryParams: QueryString[]): string {
    if (queryParams.length) {
      return `?${queryParams.map((param) => `${param.key}=${param.value}`).join('&')}`;
    }
    return '';
  }

  public async getWords(queryParams: QueryString[]): Promise<IWord[]> {
    const response = await fetch(`${this.baseUrl}${this.path.words}${this.generateQueryString(queryParams)}`);
    const words = await response.json();
    return words;
  }

  public async getWord(idWord: string): Promise<{ word: IWord }> {
    const response = await fetch(`${this.baseUrl}${this.path.words}/${idWord}`);
    const word = await response.json();
    return word;
  }

  public async userSingIn(body: ObjectString): Promise< { code: number, authUser: IAuth } > {
    const response = await fetch(`${this.baseUrl}${this.path.signin}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const code = response.status;

    if (code !== 200) {
      return {
        code,
        authUser: {
          message: '',
          token: '',
          refreshToken: '',
          userId: '',
          name: '',
        },
      };
    }

    const authUser = await response.json();

    return { code, authUser };
  }

  public async createUser(body: ObjectString): Promise<number> {
    const response = await fetch(`${this.baseUrl}${this.path.users}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const code = await response.status;
    return code;
  }

  public async getUser(idUser: string, token: string): Promise< IUser > {
    const response = await fetch(`${this.baseUrl}${this.path.users}/${idUser}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });
    const user = await response.json();
    return user;
  }

  public async updateUser(
    idUser: string,
    token: string,
    body: ObjectString,
  ): Promise<number> {
    const response = await fetch(`${this.baseUrl}${this.path.users}/${idUser}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const status = await response.status;
    return status;
  }

  public async deleteUser(idUser: string, token: string): Promise<number> {
    const response = await fetch(`${this.baseUrl}${this.path.users}/${idUser}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });
    const status = await response.status;
    return status;
  }

  public async getUserTokens(idUser: string, refreshToken: string): Promise<IAuth> {
    const response = await fetch(`${this.baseUrl}${this.path.users}/${idUser}/tokens`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${refreshToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const auth = await response.json();
    return auth;
  }

  public async getUserWords(id: string, token: string): Promise<IWord[]> {
    const response = await fetch(`${this.baseUrl}${this.path.users}/${id}/words`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const words = await response.json();
    return words;
  }

  public async createUserWord(
    idUser: string,
    token: string,
    idWord: string,
    body: IUserWord,
  ): Promise<number> {
    const response = await fetch(`${this.baseUrl}${this.path.users}/${idUser}/words/${idWord}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const status = await response.status;
    return status;
  }

  public async getUserWord(
    idUser: string,
    idWord: string,
    token: string,
  ): Promise<IUserWord> {
    const response = await fetch(`${this.baseUrl}${this.path.users}/${idUser}/words/${idWord}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const words = await response.json();
    return words;
  }

  public async updateUserWord(
    idUser: string,
    idWord: string,
    token: string,
    body: IUserWord,
  ): Promise<number> {
    const response = await fetch(`${this.baseUrl}${this.path.users}/${idUser}/words/${idWord}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const status = await response.status;
    return status;
  }

  public async deleteUserWord(
    idUser: string,
    idWord: string,
    token: string,
  ): Promise<number> {
    const response = await fetch(`${this.baseUrl}${this.path.users}/${idUser}/words/${idWord}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const status = await response.status;
    return status;
  }

  public async getUsersAggregatedWords(
    idUser: string,
    token: string,
    queryParams: QueryString[],
  ): Promise< IAggregatedWord[] > {
    const response = await fetch(`${this.baseUrl}${this.path.users}/${idUser}/aggregatedWords/?wordsPerPage=20&filter={"$and":[{"group":${queryParams[0].value}, "page":${queryParams[1].value}}]}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });
    const responceObj = await response.json();
    const words = responceObj[0].paginatedResults;
    return words;
  }

  public async getUsersAggregatedWordsByDifficulty(
    idUser: string,
    token: string,
    difficulty: string,
  ): Promise< IAggregatedWord[] > {
    const response = await fetch(`${this.baseUrl}${this.path.users}/${idUser}/aggregatedWords/?wordsPerPage=600&filter={"userWord.difficulty":"${difficulty}"}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });
    const responceObj = await response.json();
    const words = responceObj[0].paginatedResults;
    return words;
  }

  public async getUsersAggregatedWord(
    idUser: string,
    idWord: string,
    token: string,
  ): Promise<{ words: IUserWord }> {
    const response = await fetch(`${this.baseUrl}${this.path.users}/${idUser}/aggregatedWords/${idWord}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });
    const words = await response.json();
    return words;
  }

  public async getUsersStatistic(
    idUser: string,
    token: string,
  ): Promise<IStatistic> {
    const response = await fetch(`${this.baseUrl}${this.path.users}/${idUser}/statistics`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });
    const statistics = await response.json();
    return statistics;
  }

  public async updateUserStatistic(
    idUser: string,
    token: string,
    body: IStatistic,
  ): Promise<number> {
    const response = await fetch(`${this.baseUrl}${this.path.users}/${idUser}/statistics`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const status = await response.status;
    return status;
  }

  public async getUsersSetting(
    idUser: string,
    token: string,
  ): Promise<ISetting> {
    const response = await fetch(`${this.baseUrl}${this.path.users}/${idUser}/settings`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });
    const settings = await response.json();
    return settings;
  }

  public async updateUserSetting(
    idUser: string,
    token: string,
    body: ISetting,
  ): Promise<number> {
    const response = await fetch(`${this.baseUrl}${this.path.users}/${idUser}/settings`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const status = await response.status;
    return status;
  }
}
