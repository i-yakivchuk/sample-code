/**
 * Created by ivan on 27.02.17.
 */
import { Injectable } from '@angular/core';
import { StoreHelper } from './store-helper';
import { Store } from '../store';
import { ApiService } from './api';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import {ApiHelperService} from "./apiHelper";

@Injectable()
export class ProfileService {
    path = '/profile';
    constructor(
        private api: ApiService,
        private apiHelper: ApiHelperService,
        private storeHelper: StoreHelper,
        private store: Store
    ) {}

    getProfile(): Observable<any> {
        return this.api.get(`${this.path}`)
            .do((res: any) => res)
            .map((res: any) => res);
    };

    getInviteCount(): Observable<any> {
        return this.api.get(`/counter`)
            .do((res: any) => res)
            .map((res: any) => res);
    };
}