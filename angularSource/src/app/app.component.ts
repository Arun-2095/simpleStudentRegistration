import { Component } from '@angular/core';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { DbconnectService } from './dbconnect.service';
import { Source } from './interface/studentData' ;
import * as _ from 'lodash';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
public formGroup: FormGroup;
public studentId: string;

public student = new FormGroup({
name: new FormControl(''),
fathername: new FormControl(''),
age: new FormControl(''),
dob: new FormControl(''),

address: new FormGroup({
 street:  new FormControl(''),
 city:  new FormControl(''),
 state:  new FormControl(''),
 pincode:  new FormControl(''),
})

  });


constructor(public dataBase: DbconnectService ) {

}

public submitData(form: NgForm) {
  if (this.studentId) {
this.updateStudent(form, this.student, this.studentId );

  } else {
this.postData(form);
  }

}

public postData(form: NgForm) {
const student: Source = this.student.value;
this.dataBase.registerStudent(student).subscribe(
    (res) => console.log(res),
     (err) => console.log(err));
form.reset();
  }

public dataFromTable($event) {
    this.studentId = $event._id;
    this.student.setValue(_.omit($event, '_id', '__v'));
  }

public updateStudent(form: NgForm, student: FormGroup, studentId: string ) {
  const updatedstudent: Source = student.value;

  this.dataBase.updateStudent(updatedstudent, studentId).subscribe(
    (res) => console.log(res),
     (err) => console.log(err));
  form.reset();
  this.studentId = '';
}

public resetForm(formRef) {
  formRef.reset();
  this.studentId = '';
}

}
