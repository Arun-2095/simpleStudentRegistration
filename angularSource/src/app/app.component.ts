import { Component, ViewChild , ChangeDetectorRef } from '@angular/core';
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


constructor(public dataBase: DbconnectService,
            public cd: ChangeDetectorRef ) {

}

@ViewChild('studendChildComponent') studentComponent: StudentsdetailComponent;

public submitData(form: NgForm) {
  if (this.studentId) {
this.updateStudent(form, this.student, this.studentId)
.then(() => {
  this.studentId = '';
  this.studentComponent.ngOnInit();
}

).catch((err) => console.log(err));
// this.cd.detectChanges();

  } else {
this.postData(form , this.student).then(
 () => {
  this.studentComponent.ngOnInit();
 }

);


  }

}

// posting data to database

public postData(form: NgForm, studentformModule) {

  return new Promise ((resolve, reject) => {
    const student: Source = studentformModule.value;
    this.dataBase.registerStudent(student).subscribe(
        (res) => {
          form.reset();
          resolve(res);
        },
         (err) => {
          reject(err);
         });

  });


  }

// getting updated data from child;

public dataFromTable($event) {
    console.log($event);
    this.studentId = $event._id;
    this.student.setValue(_.omit($event, '_id', '__v'));
  }

// updating  data to database

public updateStudent(form: NgForm, student: FormGroup, studentId: string) {
  return new Promise( (resolve, reject) => {
    const updatedstudent: Source = student.value;
    this.dataBase.updateStudent(updatedstudent, studentId).subscribe(
      (res) => {
        form.reset();
        resolve(res);
      },
       (err) => {
        reject(err);
       });
  });
}

// reset the form
public resetForm(formRef) {
  formRef.reset();
  this.studentId = '';
}


// getting request to delete data in database

public deleteData($event: string) {
  return new Promise( (resolve, reject) => {
    this.dataBase.deleteStudent($event).subscribe(
      (res) => {
        console.log(res);
        resolve(res);
      } ,
      (err) => {
        reject(err);
        console.log(err);
      });
  }).then(() => {
    this.studentComponent.ngOnInit();
  });


}

initiateTable(studentComponent) {
 studentComponent.ngOnInit();
}

}
