import { Component, OnInit } from '@angular/core';
import { DbconnectService } from '../dbconnect.service';

@Component({
  selector: 'app-studentsdetail',
  templateUrl: './studentsdetail.component.html',
  styleUrls: ['./studentsdetail.component.css']
})
export class StudentsdetailComponent implements OnInit {
  public allStudent;

  constructor(private dataBase: DbconnectService) { }

  ngOnInit() {
    this.dataBase.allStudents().subscribe(
      (res) => {
        console.log(res);
        this.allStudent = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
