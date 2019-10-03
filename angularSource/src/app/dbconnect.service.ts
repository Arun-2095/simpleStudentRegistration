import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Student } from './interface/studentData';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbconnectService {

  constructor(private http: HttpClient) { }


registerStudent(data): Observable<Student> {
  const header = new HttpHeaders();
  header.append('Content-Type' , 'application/json');

  return this.http.post<Student>('http://localhost:5000/student/register', data , {headers: header});
}

}
