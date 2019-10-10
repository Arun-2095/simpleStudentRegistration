import { Component, OnInit, Output, Input, AfterViewInit,  EventEmitter , ViewChild } from '@angular/core';
import { Source } from '../interface/studentData';
import { MatDialog , MatTableDataSource , MatPaginator , PageEvent } from '@angular/material';
import { DialogboxComponent } from './dialogbox/dialogbox.component';
import { DbconnectService } from '../dbconnect.service';


@Component({
  selector: 'app-studentsdetail',
  templateUrl: './studentsdetail.component.html',
  styleUrls: ['./studentsdetail.component.css']
})
export class StudentsdetailComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Output()updateFormEvent = new EventEmitter<Source>();
  @Output()deletedataEvent = new EventEmitter<string>();

  public data;
  pageSizeOptions: number[] = [4, 8, 12, 16];
  pageEvent: PageEvent;





public displayData: string[] = ['Name', 'FatherName' , 'Age', 'DoB', 'Address', 'Update' ];

constructor(public dialog: MatDialog , public database: DbconnectService) { }

ngOnInit() {
  this.database.allStudents().subscribe(
    (res) => {
         this.data = new MatTableDataSource(res);
         this.data.paginator = this.paginator;
        },
    (err) => {
      console.log(err);
    }
  );
}

openDialog(row) {
 const dialogRef = this.dialog.open(DialogboxComponent , {data : {
   name: row.name,
   id : row._id
 }});
 dialogRef.afterClosed().subscribe((result) => {
  if (typeof(result) === 'string') {
        this.deletedataEvent.emit(result);

  } });

}

editData(row) {
this.updateFormEvent.emit(row);
}

}
