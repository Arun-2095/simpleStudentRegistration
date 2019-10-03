import { NgModule } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule , MatNativeDateModule } from '@angular/material';
import {MatButtonModule} from '@angular/material';
import {MatCardModule} from '@angular/material';
import {MatDividerModule} from '@angular/material';
import {MatListModule} from '@angular/material';
import {MatExpansionModule} from '@angular/material';

const material = [MatInputModule , MatDatepickerModule,
   MatNativeDateModule, MatButtonModule,
   MatDividerModule, MatCardModule, MatListModule,
   MatExpansionModule];


@NgModule({
  declarations: [],
  imports: [material],
  exports: [material]
})
export class MaterialModule { }
