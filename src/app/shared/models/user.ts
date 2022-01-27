export class User {
  id: number;

  constructor(id: number, username: string, password: string, firstName: string, lastName: string, token: string) {
    this.id = id;
    this._username = username;
    this._password = password;
    this._firstName = firstName;
    this._lastName = lastName;
    this._token = token;
  }

  private _username: string;

  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }

  private _password: string;

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  private _firstName: string;

  get firstName(): string {
    return this._firstName;
  }

  set firstName(value: string) {
    this._firstName = value;
  }

  private _lastName: string;

  get lastName(): string {
    return this._lastName;
  }

  set lastName(value: string) {
    this._lastName = value;
  }

  private _token?: string;

  get token(): string {
    return <string>this._token;
  }

  set token(value: string) {
    this._token = value;
  }
}
