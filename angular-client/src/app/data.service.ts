import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = 'http://localhost:5000/api/records';

  constructor(private http: HttpClient) {}

  getRecords(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
