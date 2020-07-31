import { Component, OnInit, OnDestroy } from '@angular/core';
import { DialogService } from './dialog.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit, OnDestroy {
    showModal = true;
    message = '';
    title = '';
    subscription$: Subscription;
    constructor(private dialogService: DialogService) { }
    ngOnInit() {
        this.subscription$ = this.dialogService.show.subscribe(x => {
            if (x && x.status == true) {
                this.showModal = true;
                this.message = x.message;
                this.title = x.title;
                setTimeout(() => {
                    this.onCloseModal();
                }, 4000);
            } else {
                this.onCloseModal();
            }
        })
    }
    onCloseModal() {
        this.showModal = false;
        this.message = '';
        this.title = '';
    }
    ngOnDestroy() {
        if (this.subscription$) {
            this.subscription$.unsubscribe();
        }
    }
}