import { Component, OnInit, Output, Input, AfterViewInit,  EventEmitter , ViewChild, ChangeDetectorRef } from '@angular/core';
import { Source } from '../interface/studentData';
import { MatDialog , MatTableDataSource , MatPaginator, MatTable } from '@angular/material';
import { DialogboxComponent } from './dialogbox/dialogbox.component';
import { DbconnectService } from '../dbconnect.service';


@Component({
  selector: 'app-studentsdetail',
  templateUrl: './studentsdetail.component.html',
  styleUrls: ['./studentsdetail.component.css'],
})

export class StudentsdetailComponent implements OnInit {

constructor(public dialog: MatDialog , public database: DbconnectService ,
            private cd: ChangeDetectorRef) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Output()updateFormEvent = new EventEmitter<Source>();
  @Output()deletedataEvent = new EventEmitter<string>();

  public data;
  public tableData;
  pageSizeOptions: number[] = [4, 8, 12, 16];

public displayData: string[] = ['Name', 'FatherName' , 'Age', 'DoB', 'Address', 'Update' ];

public ngOnInit() {
  this.database.allStudents()
  .subscribe(
    (res) => {
      this.tableData = new MatTableDataSource(res);
      this.tableData.paginator = this.paginator;
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
