import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";
import { environment } from '../environments/environment';

interface Response {
    image: string;
}


@Component({
    selector: 'app-root',
    template: `

        <div *ngIf="response$ | async as response else noData">
            <img src="{{response.image}}">
        </div>

    `
})
export class AppComponent implements OnInit {

    response$: Observable<Response[]>;

    constructor(private http: HttpClient) {

    }

    ngOnInit() {

        // Simple HTTP GET
        this.response$ = this.http
            .get<Response[]>(environment.apiURL);
    }

}
