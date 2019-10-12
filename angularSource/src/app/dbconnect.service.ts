import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders , HttpErrorResponse  } from '@angular/common/http';
import { Source , Message } from './interface/studentData';

import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class DbconnectService {

  constructor(private http: HttpClient) { }

private handleError(error: HttpErrorResponse) {

 return throwError(error);

}

// posting datum to database

public registerStudent(data): Observable<Source> {

  const header = new HttpHeaders();
  header.append('Content-Type' , 'application/json');

  return this.http.post<Source>('/student/register', data , {headers: header})
  .pipe(
    tap( (student) => console.log('successfully posted' + student)
    ),
    catchError(this.handleError),
  );
}

// fetching data from database
public allStudents(): Observable<Source[]> {

   return this.http.get<Source[]>('/student/').pipe(
   catchError(this.handleError),
    );
}

// updating datum in database
public updateStudent(data, id): Observable<Source> {

  const header = new HttpHeaders();
  header.append('Content-Type' , 'application/json');

  return this.http.put<Source>('/student/register/' + id, data , {headers: header})
  .pipe(
  catchError(this.handleError),
  );
}


public deleteStudent(id: string): Observable<Message> {

 return  this.http.delete<Message>('/student/register/' + id)
  .pipe(
      catchError(this.handleError),
  );

}

}
