import { Component } from '@angular/core';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { DbconnectService } from './dbconnect.service';
import { Student } from './interface/studentData' ;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 public allstudentData ;

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

  this.dataBase.allStudents().subscribe(
    (res) => {
      console.log(res);
      this.allstudentData = res;
    },
    (err) => {
      console.log(err);
    }
  );

}

public postData(form: NgForm) {
 const student: Student = this.student.value;

 this.dataBase.registerStudent(student).subscribe(
    (res) => console.log(res),
     (err) => console.log(err));
 form.reset();
  }


}
