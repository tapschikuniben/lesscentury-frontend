import { Component, OnInit, ViewChild } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Customer } from 'src/app/models/customer';
import { NotifierService } from 'src/app/services/notifier.service';
import { CustomerService } from 'src/app/services/customer.service';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { NewCustomerComponent } from '../new-customer/new-customer.component';
import { CustomerDetailComponent } from '../customer-detail/customer-detail.component';

@Component({
  selector: 'app-customer-info',
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.css']
})
export class CustomerInfoComponent implements OnInit {

  public customer: Customer;
  public customerDialogRef: MatDialogRef<NewCustomerComponent>;
  public customerDetailRef: MatDialogRef<CustomerDetailComponent>;
  public CustomerData: any = [];
  public dataSource: MatTableDataSource<Customer>;
  @ViewChild('customer_paginator', { static: true }) customer_paginator: MatPaginator;
  public pageSizeOptions: number[] = [];
  public pageEvent: PageEvent;
  public pageSize = 5;
  public color: ThemePalette = 'accent';
  public checked = false;
  public disabled = false;
  public displayedColumns: string[] = ['first_name', 'last_name', 'email', 'contact', 'last_login', 'country', 'city', 'view', 'action'];


  constructor(
    private customerService: CustomerService,
    private dialog: MatDialog,
    private notifier: NotifierService,
  ) { }

  ngOnInit(): void {
    this.getAllCustomers();
    this.initializePageSizeOptions();
  }

  //create new customer
  openNewCustomerDialog() {
    this.customerDialogRef = this.dialog.open(NewCustomerComponent, { width: '50%', maxHeight: '620px' });

    this.customerDialogRef.updatePosition({
      top: '4%',
    });

    this.customerDialogRef.afterClosed().subscribe(result => {
      this.getAllCustomers();
    });
  }

  //getting all customers
  getAllCustomers(): void {
    // get main customer
    this.customerService.getAllCustomers().subscribe(data => {
      this.CustomerData = data;
      this.dataSource = new MatTableDataSource<Customer>(this.CustomerData);
      setTimeout(() => {
        this.dataSource.paginator = this.customer_paginator;
      }, 0);
    })
  }

  //deleting customer
  deleteCustomer(index: number, e) {
    const data = this.dataSource.data;
    console.log('page index', this.customer_paginator.pageIndex)
    data.splice((this.customer_paginator.pageIndex * this.customer_paginator.pageSize) + index, 1);
    this.dataSource.data = data;
    this.customerService.deleteCustomer(e.id).subscribe()
  }

  //confirm to delete customer
  confirmDialog(myindex: number, e): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, { width: '500px', data: "NB: This can not be undone" });

    dialogRef.updatePosition({
      top: '8%',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if (result) {
        this.deleteCustomer(myindex, e);
        this.notifier.Notification("success", "successfully deleted.");
      } else {
        this.notifier.Notification("warning", "action aborted");
      }
    });
  }

  //open customer details
  openCustomerDetail(selected): void {
    const dialogRef = this.dialog.open(CustomerDetailComponent, {
      width: '50%',
      maxHeight: '620px',
      data: selected,
    });

    dialogRef.updatePosition({
      top: '4%',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllCustomers();
    });
  }

  public applyCustomerFilter(filterValue: any) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.paginator.firstPage();
  }

  //toggle switch changes
  updatingCustomer(currentcustomer) {
    this.customerService.updateCustomer(currentcustomer).subscribe(updatedcustomer => {
      this.customer = updatedcustomer;
      if (updatedcustomer) {
        this.notifier.Notification("success", "successfully updated.");
      } else {
        this.notifier.Notification("warning", "failed to update.");
      }
    })
  }

  public todayDealsChange(currentcustomer) {
    this.updatingCustomer(currentcustomer)
  }

  public isFeatureChange(currentcustomer) {
    this.updatingCustomer(currentcustomer)
  }

  initializePageSizeOptions(): void {
    for (let i = 5; i <= 1000; i += 5) {
      this.pageSizeOptions.push(i);
    }
  }

}
