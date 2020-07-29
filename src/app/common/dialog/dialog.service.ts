import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class DialogService {
    show: BehaviorSubject<any> = new BehaviorSubject({});
}