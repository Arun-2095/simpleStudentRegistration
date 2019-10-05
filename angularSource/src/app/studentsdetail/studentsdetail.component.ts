import { Component, OnInit, Input } from '@angular/core';
import { Source } from '../interface/studentData';

@Component({
  selector: 'app-studentsdetail',
  templateUrl: './studentsdetail.component.html',
  styleUrls: ['./studentsdetail.component.css']
})
export class StudentsdetailComponent implements OnInit {

@Input() studentsData: Array<Source> ;

  constructor() { }

  ngOnInit() {
  }

}
