import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RootService {
  constructor(private http: HttpClient) {}
  configuration =
    '?app_id=' + environment.app_id + '&app_key=' + environment.app_key;

  /**
   * Get request using angular httpClient module
   * @param {string} url - the end point url
   * @param {?any} [data] - request paiload
   * @return {Observable} Observable of response, comes from the end point
   */
  getRoot(url: string, data?: any): Observable<any> {
    return this.http.get(environment.serverUrl + url, data);
  }

  /**
   * Post request using angular httpClient module
   * @param {string} url - the end point url
   * @param {any} data - request paiload
   * @return {Observable} Observable of response, comes from the end point
   */
  postRoot(url: string, data: any): Observable<any> {
    return this.http.post(
      environment.serverUrl + url + this.configuration,
      data
    );
  }

  /**
   * Get request using angular httpClient module
   * you can bass a parameter (data) in the url seperated by '/'
   * @param {string} url - the end point url
   * @param {string} data - request paiload
   * @return {Observable} Observable of response, comes from the end point
   */
  getHeaderReq(url: string, data: string): Observable<any> {
    return this.http.get(environment.serverUrl + url + '/' + data);
  }

  /**
   * PUT request using angular httpClient module
   * you can bass a parameter (data) in the url seperated by '/'
   * @param {string} url - the end point url
   * @param {?any} data - request paiload
   * @return {Observable} Observable of response, comes from the end point
   */
  putRoot(url: string, data?: any): Observable<any> {
    return this.http.put(environment.serverUrl + url, data);
  }

  /**
   * DELETE request using angular httpClient module
   * you can bass a parameter (data) in the url seperated by '/'
   * @param {string} url - the end point url
   * @param {?any} data - request paiload
   * @return {Observable} Observable of response, comes from the end point
   */
  deleteRoot(url: string, data?: any): Observable<any> {
    return this.http.delete(environment.serverUrl + url + '/' + data);
  }
}
