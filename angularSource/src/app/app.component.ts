import { Component } from '@angular/core';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { DbconnectService } from './dbconnect.service';
import { Source , MapedData } from './interface/studentData' ;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 public allstudentData: [Array<Source>] = [][];

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
         const iteration: number = Math.round(res.length / 4);
         for (let i = 0; i < iteration; i++) {
             const temp: Array<Source> = res.splice(0, 4);
             this.allstudentData[i][0].push(temp);
      }
         console.log(this.allstudentData);
        //  console.log((this.allstudentData as Array<Source>).length);
    },
    (err) => {
      console.log(err);
    }
  );

}

public postData(form: NgForm) {
 const student: Array<Source> = this.student.value;

 this.dataBase.registerStudent(student).subscribe(
    (res) => console.log(res),
     (err) => console.log(err));
 form.reset();
  }


}
