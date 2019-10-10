import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { DbconnectService } from './dbconnect.service';
import { Source } from './interface/studentData' ;
import * as _ from 'lodash';
import { StudentsdetailComponent } from './studentsdetail/studentsdetail.component';


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

@ViewChild('studendChildComponent') studentComponent: StudentsdetailComponent;

public submitData(form: NgForm) {
  if (this.studentId) {
this.updateStudent(form, this.student, this.studentId, this.studentComponent);


  } else {
this.postData(form);


  }

}

// posting data to database

public postData(form: NgForm) {
const student: Source = this.student.value;
this.dataBase.registerStudent(student).subscribe(
    (res) => console.log(res),
     (err) => console.log(err));
form.reset();
this.studentComponent.ngOnInit();
  }

// getting updated data from child;

public dataFromTable($event) {
    console.log($event);
    this.studentId = $event._id;
    this.student.setValue(_.omit($event, '_id', '__v'));
  }

// updating  data to database

public updateStudent(form: NgForm, student: FormGroup, studentId: string , studentComponent: StudentsdetailComponent) {
  const updatedstudent: Source = student.value;

  this.dataBase.updateStudent(updatedstudent, studentId).subscribe(
    (res) => console.log(res),
     (err) => console.log(err));
  form.reset();
  this.studentId = '';
  console.log('data updated');
  studentComponent.ngOnInit();
}

// reset the form
public resetForm(formRef) {
  formRef.reset();
  this.studentId = '';
}


// getting request to delete data in database

public deleteData($event: string) {
this.dataBase.deleteStudent($event).subscribe(
  (res) => console.log(res),
  (err) => console.log(err));
this.studentComponent.ngOnInit();
}


}
