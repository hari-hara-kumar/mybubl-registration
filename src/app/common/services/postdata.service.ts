import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class PostDataService {
    baseUrl = environment.baseurl;
    constructor(private http: HttpClient) { }

    post(url, data) {
        return this.http.post(this.baseUrl + url, data);
    }

    get(url, param) {
        return this.http.get(this.baseUrl + url, {params: param});
    }

}