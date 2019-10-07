import { Component, OnInit, Input, AfterViewInit, ViewChild } from '@angular/core';
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

openDialog() {
 const dialogRef = this.dialog.open(DialogboxComponent);
 dialogRef.afterClosed().subscribe((result) => {console.log(result); });
}

setPageSizeOptions(setPageSizeOptionsInput: string) {
  this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
}

}
