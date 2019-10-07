import { NgModule } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule , MatNativeDateModule } from '@angular/material';
import {MatButtonModule} from '@angular/material';
import {MatCardModule} from '@angular/material';
import {MatDividerModule} from '@angular/material';
import {MatListModule} from '@angular/material';
import {MatExpansionModule} from '@angular/material';
import {MatTableModule} from '@angular/material';
import {MatIconModule} from '@angular/material';
import {MatDialogModule} from '@angular/material';
import {MatPaginatorModule} from '@angular/material/paginator';

const material = [MatInputModule , MatDatepickerModule,
   MatNativeDateModule, MatButtonModule,
   MatDividerModule, MatCardModule, MatListModule,
   MatExpansionModule, MatTableModule, MatIconModule,
   MatDialogModule, MatPaginatorModule];


@NgModule({
  declarations: [],
  imports: [material],
  exports: [material]
})
export class MaterialModule { }
