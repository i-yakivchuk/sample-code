/**
 * Created by ivan on 08.12.16.
 */
import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/observable/throw';
import { Router } from "@angular/router";
import {ApiHelperService} from "./apiHelper";
import {BroadcastService} from "./broadcastService";
import {SERVER_ERROR} from "../config";

@Injectable()
export class ApiService {
  headers : Headers = new Headers({
    'Content-Type': 'application/json',
    Accept: 'application/json'
  });
  headersWithoutContentType : Headers = new Headers({
    Accept: 'application/json'
  });

  constructor(
    private http: Http,
    private router: Router,
    private apiHelper: ApiHelperService,
    private broadcastService: BroadcastService
  ) {
    
  }
  
  private checkForError(response : Response) : Response {
    if (response.status >= 200 && response.status <= 300) {
      return response;
    } else {
      const error = new Error(response.statusText);
      error['response'] = response;
      throw error;
    }
  }
  
  showError = (err) => {
    console.log(err);
    console.log(err.status);

    if(err.status == 0 || err.status >= 500) {
      this.broadcastService.broadcast('error', SERVER_ERROR);
    }
    if(err.status == 401) {
      this.deactivate();
      this.router.navigate(['auth']);
    }

    let errors = this.apiHelper.getJson(err);
    let errorValue: string = '';
    for (let key in errors) {
      errorValue += (errors[key] instanceof Array) ?  errors[key][0] : errors[key];
      errorValue += '\n';
    }
    if (err.status !== 0 && errorValue.length !== 0 ) {
      console.log(errorValue);
      this.broadcastService.broadcast('error', errorValue);
    }

    this.broadcastService.broadcast('showLoader', false);
    return Observable.throw(err);
  };

  getJson = (response : Response) => {
    this.broadcastService.broadcast('showLoader', false);
    return this.apiHelper.getJson(response);
  };

  hideLoader = (response : Response) => {
    this.broadcastService.broadcast('showLoader', false);
    return response;
  };
  
  get(path : string) : Observable<any> {
    this.broadcastService.broadcast('showLoader', true);
    return this.http.get(`${this.api_url}${path}`, {headers: this.headers})
      .map(this.checkForError)
      .catch(this.showError)
      .map(this.getJson)
  }
  
  post(path : string, body) : Observable<any> {
    this.broadcastService.broadcast('showLoader', true);
    return this.http.post(
      `${this.api_url}${path}`,
      JSON.stringify(body),
      {headers: this.headers}
    )
      .map(this.checkForError)
      .catch(this.showError)
      .map(this.getJson)
  }

  postNoContent(path : string, body) : Observable<any> {
    this.broadcastService.broadcast('showLoader', true);
    return this.http.post(
      `${this.api_url}${path}`,
      JSON.stringify(body),
      {headers: this.headers}
    )
      .map(this.checkForError)
      .catch(this.showError)
      .map(this.hideLoader)
  }
  
  delete(path : string) : Observable<any> {
    this.broadcastService.broadcast('showLoader', true);
    return this.http.delete(`${this.api_url}${path}`, {headers: this.headers})
      .map(this.checkForError)
      .catch(this.showError)
      .map(this.getJson)
  }
  
  patch(path: string, body, type?:any) : Observable<any> {
    let fullBody;
    if (type == 'formData') {
      fullBody = new FormData();
      for (let key in body) {
        fullBody.append(key, body[key])
      }
    } else {
      fullBody = JSON.stringify(body)
    }
    this.broadcastService.broadcast('showLoader', true);
    return this.http.patch(
      `${this.api_url}${path}`,
      fullBody,
      {headers: Boolean(type) ? this.headersWithoutContentType : this.headers}
    )
      .map(this.checkForError)
      .catch(this.showError)
      .map(this.getJson)
  }
  
  put(path: string, body) : Observable<any> {
    this.broadcastService.broadcast('showLoader', true);
    return this.http.patch(
      `${this.api_url}${path}`,
      JSON.stringify(body),
      {headers: this.headers}
    )
      .map(this.checkForError)
      .catch(this.showError)
      .map(this.getJson)
  }
  
  setHeaders(headers) {
    Object.keys(headers)
      .forEach(header => this.headers.set(header, headers[header]));
    Object.keys(headers)
      .forEach(header => this.headersWithoutContentType.set(header, headers[header]));
  }
  
  removeHeader(headerName: string) {
    this.headers.delete(headerName)
  }
  
  deactivate() {
    this.removeHeader('Authorization');
    this.apiHelper.removeTokenFromLocalStorage('auth_token');
  }
}
