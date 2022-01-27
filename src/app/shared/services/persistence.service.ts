import {Injectable} from "@angular/core";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class PersistenceService {
  public isLogged: boolean = false;
  loggedChange: Subject<boolean> = new Subject<boolean>();
  private token: string | null;
  private username: string;

  constructor() {
    this.loggedChange.subscribe((value) => {
      this.isLogged = value;
    })
  }


  public getToken(): string | null {
    return this.token;
  }

  public setToken(token: string | null) {
    this.token = token;
    this.loggedChange.next(token !== null);
  }

  public getUsername(): string {
    return this.username;
  }

  public setUsername(username: string) {
    this.username = username;
  }
}
