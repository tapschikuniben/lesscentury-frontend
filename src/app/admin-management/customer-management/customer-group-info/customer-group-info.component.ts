import { Component, OnInit, ViewChild } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CustomerGroup } from 'src/app/models/customerGroup';
import { NotifierService } from 'src/app/services/notifier.service';
import { CustomerGroupService } from 'src/app/services/customerGroup.service';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { NewCustomerGroupComponent } from '../new-customer-group/new-customer-group.component';
import { CustomerGroupDetailComponent } from '../customer-group-detail/customer-group-detail.component';

@Component({
  selector: 'app-customer-group-info',
  templateUrl: './customer-group-info.component.html',
  styleUrls: ['./customer-group-info.component.css']
})
export class CustomerGroupInfoComponent implements OnInit {

  public customerGroup: CustomerGroup;
  public customerGroupDialogRef: MatDialogRef<NewCustomerGroupComponent>;
  public customerGroupDetailRef: MatDialogRef<CustomerGroupDetailComponent>;
  public CustomerGroupData: any = [];
  public dataSource: MatTableDataSource<CustomerGroup>;
  @ViewChild('customerGroup_paginator', { static: true }) customerGroup_paginator: MatPaginator;
  public pageSizeOptions: number[] = [];
  public pageEvent: PageEvent;
  public pageSize = 5;
  public color: ThemePalette = 'accent';
  public checked = false;
  public disabled = false;
  public displayedColumns: string[] = ['customerGroup_name', 'status', 'view', 'action'];


  constructor(
    private customerGroupService: CustomerGroupService,
    private dialog: MatDialog,
    private notifier: NotifierService,
  ) { }

  ngOnInit(): void {
    this.getAllCustomerGroups();
    this.initializePageSizeOptions();
  }

  //create new customerGroup
  openNewCustomerGroupDialog() {
    this.customerGroupDialogRef = this.dialog.open(NewCustomerGroupComponent, { width: '50%', maxHeight: '620px' });

    this.customerGroupDialogRef.updatePosition({
      top: '4%',
    });

    this.customerGroupDialogRef.afterClosed().subscribe(result => {
      this.getAllCustomerGroups();
    });
  }

  //getting all customerGroups
  getAllCustomerGroups(): void {
    // get main customerGroup
    this.customerGroupService.getAllCustomerGroups().subscribe(data => {
      this.CustomerGroupData = data;
      this.dataSource = new MatTableDataSource<CustomerGroup>(this.CustomerGroupData);
      setTimeout(() => {
        this.dataSource.paginator = this.customerGroup_paginator;
      }, 0);
    })
  }

  //deleting customerGroup
  deleteCustomerGroup(index: number, e) {
    const data = this.dataSource.data;
    console.log('page index', this.customerGroup_paginator.pageIndex)
    data.splice((this.customerGroup_paginator.pageIndex * this.customerGroup_paginator.pageSize) + index, 1);
    this.dataSource.data = data;
    this.customerGroupService.deleteCustomerGroup(e.id).subscribe()
  }

  //confirm to delete customerGroup
  confirmDialog(myindex: number, e): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, { width: '500px', data: "NB: This can not be undone" });

    dialogRef.updatePosition({
      top: '8%',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if (result) {
        this.deleteCustomerGroup(myindex, e);
        this.notifier.Notification("success", "successfully deleted.");
      } else {
        this.notifier.Notification("warning", "action aborted");
      }
    });
  }

  //open customerGroup details
  openCustomerGroupDetail(selected): void {
    const dialogRef = this.dialog.open(CustomerGroupDetailComponent, {
      width: '50%',
      maxHeight: '620px',
      data: selected,
    });

    dialogRef.updatePosition({
      top: '4%',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllCustomerGroups();
    });
  }

  public applyCustomerGroupFilter(filterValue: any) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.paginator.firstPage();
  }

  //toggle switch changes
  updatingCustomerGroup(currentcustomerGroup) {
    this.customerGroupService.updateCustomerGroup(currentcustomerGroup).subscribe(updatedcustomerGroup => {
      this.customerGroup = updatedcustomerGroup;
      if (updatedcustomerGroup) {
        this.notifier.Notification("success", "successfully updated.");
      } else {
        this.notifier.Notification("warning", "failed to update.");
      }
    })
  }

  public todayDealsChange(currentcustomerGroup) {
    this.updatingCustomerGroup(currentcustomerGroup)
  }

  public isFeatureChange(currentcustomerGroup) {
    this.updatingCustomerGroup(currentcustomerGroup)
  }

  initializePageSizeOptions(): void {
    for (let i = 5; i <= 1000; i += 5) {
      this.pageSizeOptions.push(i);
    }
  }

}
