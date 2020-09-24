import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLayoutRoutingModule } from './admin-layout.routing'; scrollBy
import { AdminManagementModule } from '../../admin-management/admin-management.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';



@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    AdminLayoutRoutingModule,
    MatIconModule,
    MatToolbarModule,
    FormsModule,
    ReactiveFormsModule,
    AdminManagementModule,
  ]
})
export class AdminLayoutModule { }

