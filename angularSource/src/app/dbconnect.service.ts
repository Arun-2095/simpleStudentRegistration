import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders , HttpErrorResponse  } from '@angular/common/http';
import { Source} from './interface/studentData';

import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class DbconnectService {

  constructor(private http: HttpClient) { }

private handleError(error: HttpErrorResponse) {

 return throwError(error.message);

}

public registerStudent(data): Observable<Source> {

  const header = new HttpHeaders();
  header.append('Content-Type' , 'application/json');

  return this.http.post<Source>('http://localhost:5000/student/register', data , {headers: header})
  .pipe(
    tap( (student) => console.log('successfully posted' + student)
    ),
    catchError(this.handleError),
  );
}

public allStudents(): Observable<Source[]> {

   return this.http.get<Source[]>('http://localhost:5000/student/').pipe(
   catchError(this.handleError),
   tap( (student) => console.log('successfully posted' + student)
    ));
}

}
