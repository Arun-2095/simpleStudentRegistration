import { Component } from '@angular/core';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { DbconnectService } from './dbconnect.service';
import { Source } from './interface/studentData' ;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

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

public postData(form: NgForm) {
 const student: Array<Source> = this.student.value;

 this.dataBase.registerStudent(student).subscribe(
    (res) => console.log(res),
     (err) => console.log(err));
 form.reset();
  }


}
