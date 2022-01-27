import {HttpClient, HttpHeaders} from "@angular/common/http";
import {PersistenceService} from "./persistence.service";

export class HttpService {

  constructor(
    private http: HttpClient,
    protected persistence: PersistenceService,
  ) {
  }

  public getRequest(path: string, params: any, needsToken: boolean): Promise<any> {
    params = !params ? {} : params;
    return new Promise((resolve, reject) => {
      this.http.get(path, this.getOptions(params, needsToken)).subscribe(res => {
        resolve(res)
      }, err => {
        if (err.status === 200) {
          resolve(null);
        } else {
          reject(err);
        }
      })
    });
  }

  protected postRequest(path: string, body: any, needsToken: boolean): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(path, body, this.getOptions(null, needsToken)).subscribe(res => {
        resolve(res);
      }, error => {
        if (error.status === 200) {
          resolve(null);
        } else {
          reject(error);
        }
      })
    })
  }

  protected deleteRequest(path: string, needsToken: boolean): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.delete(path, this.getOptions(null, needsToken)).subscribe(res => {
        resolve(res);
      }, error => {
        if (error.status === 200) {
          resolve(null);
        } else {
          reject(error);
        }
      })
    });
  }

  private getOptions(params: any, needsToken: boolean): Object {
    let res: any = {};
    const token = this.persistence.getToken() !== null ? this.persistence.getToken()! : '';
    res['observe'] = 'response';

    if (params !== null)
      res['params'] = params;

    if (needsToken) {
      res['headers'] = new HttpHeaders().set('Authorization', token);
    }

    return res;
  }
}
