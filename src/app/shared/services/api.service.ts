import {HttpService} from "./http.service";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {PersistenceService} from "./persistence.service";
import {Game} from "../models/game";


@Injectable({
  providedIn: 'root',
})
export class ApiService extends HttpService {
  PATH: string = "http://fenw.etsisi.upm.es:10000/"

  constructor(
    http: HttpClient,
    persistence: PersistenceService,
  ) {
    super(http, persistence);
  }

  async usernameExists(username: string): Promise<boolean> {
    let route = this.PATH + 'users/' + username;

    return new Promise((resolve, reject) => {
      this.getRequest(route, null, false).then(_ => {
        resolve(true);
      }).catch(err => {
        if (err.error !== "username not found") {
          console.log(err);
        }
        resolve(false);
      })
    })
  }

  async createUser(username: string, email: string, password: string): Promise<boolean> {
    let route = this.PATH + 'users';

    return new Promise((resolve) => {
      this.postRequest(route, {username: username, email: email, password: password}, false).then(_ => {
        resolve(true);

      }).catch(err => {
        console.log('ERROR' + err)
        resolve(false);

      })
    })
  }

  async login(username: string, password: string): Promise<boolean> {
    let route = this.PATH + 'users/login';
    this.persistence.setToken(null);

    return new Promise((resolve) => {
      this.getRequest(route, {username: username, password: password}, false).then(res => {
        this.persistence.setToken(res.headers.get('authorization'))
        this.persistence.setUsername(username);
        resolve(true);

      }).catch(err => {
        console.log('ERROR' + err)
        resolve(false);

      })
    })
  }

  async getRecords(): Promise<Object> {
    let route = this.PATH + 'records';

    return new Promise((resolve, reject) => {
      this.getRequest(route, null, false).then(res => {
        resolve(res.body)
      }).catch(error => {
        reject(error.message)
      })
    })
  }

  async postRecord(punctuation: number, cards: number, disposedTime: number): Promise<boolean> {
    let route = this.PATH + 'records';

    return new Promise((resolve => {
      this.postRequest(route, {punctuation: punctuation, cards: cards, disposedTime: disposedTime}, true).then(res => {
        this.persistence.setToken(res.headers.get('authorization'))
        resolve(true);
      }).catch(_ => {
        resolve(false);
      })
    }))
  }

  async saveGame(game: Game): Promise<boolean> {
    let route = this.PATH + 'games';
    return new Promise((resolve => {
      this.postRequest(route, game, true).then(res => {
        this.persistence.setToken(res.headers.get('authorization'))
        resolve(true);
      }).catch(_ => {
        resolve(false);
      })
    }))
  }

  async loadGame(): Promise<Game> {
    let route = this.PATH + 'games';

    return new Promise((resolve, reject) => {
      this.getRequest(route, null, true).then(res => {
        resolve(JSON.parse(res.body));
      }).catch(err => {
        console.log(err);
      })
    })
  }

  async getUserRecords(username: string): Promise<Object> {
    let route = this.PATH + 'records/' + username;

    return new Promise((resolve, reject) => {
      this.getRequest(route, {username: username}, true).then(res => {
        this.persistence.setToken(res.headers.get('authorization'))
        resolve(res.body)
      }).catch(err => {
        reject(err.message)
      })
    })
  }

  async deleteUserRecords(): Promise<boolean> {
    let route = this.PATH + 'records';

    return new Promise((resolve) => {
      this.deleteRequest(route, true).then(res => {
        resolve(true);
      }).catch(error => {
        resolve(false);
      })
    })
  }

}
