import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import {map, catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  api: string = environment.api;
  constructor(
    private http: HttpClient
  ) {}

  createRecord(data: any): Observable<any> {
    return this.http
      .post<any>(`${this.api}/record`, data)
      .pipe(map((record: any) => record), catchError(this.handleError));
  }

  private handleError(handleError: any): import("rxjs").OperatorFunction<any, any> {
    throw new Error("Method not implemented.");
  }
}
