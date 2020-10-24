import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientManagementModule } from '../../client-management/client-management.module';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    ClientManagementModule,
    CommonModule,
    MatIconModule,
    MatToolbarModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ClientLayoutModule { }
