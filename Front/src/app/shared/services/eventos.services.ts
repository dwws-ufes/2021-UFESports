import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';


@Injectable()
export class EventoService{

    constructor(private http: HttpClient) { }
    createEvent(event:any) {
        return this.http.post<any>('http://localhost:3000/events', event).toPromise();
        
      }
}
