import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomerGroup } from 'src/app/models/customerGroup';
import { NotifierService } from 'src/app/services/notifier.service';
import { CustomerGroupService } from 'src/app/services/customerGroup.service';

@Component({
  selector: 'app-customer-group-detail',
  templateUrl: './customer-group-detail.component.html',
  styleUrls: ['./customer-group-detail.component.css']
})
export class CustomerGroupDetailComponent implements OnInit {

  public customerGroup: CustomerGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public customerGroupdatainfo: any,
    private customerGroupService: CustomerGroupService,
    private notifier: NotifierService,
    public dialogRef: MatDialogRef<CustomerGroupDetailComponent>,
  ) { }

  ngOnInit(): void {
    this.initializeCustomerGroup();
    this.getCustomerGroup();
  }

  initializeCustomerGroup(): void {
    this.customerGroup = {
      _id: '',
      customerGroup_name: '',
      status: '',
      created_by: '',
      modified_by: '',
      created_date: new Date(Date.now()),
      modified_date: new Date(Date.now()),
    }
  }

  // get customerGroup by Id
  getCustomerGroup() {
    const customerGroupId = this.customerGroupdatainfo.id
    if (customerGroupId) {
      this.customerGroupService.getCustomerGroupById(customerGroupId).subscribe(returnedcustomerGroup => {
        this.customerGroup = returnedcustomerGroup;
      })
    }
  }

  // update customerGroup
  updateCustomerGroup(currentcustomerGroup: CustomerGroup): void {
    {
      this.customerGroupService.updateCustomerGroup(currentcustomerGroup).subscribe(updatedcustomerGroup => {
        this.customerGroup = updatedcustomerGroup;
        if (updatedcustomerGroup) {
          this.notifier.Notification("success", "successfully updated.");
          this.getCustomerGroup();
        } else {
          this.notifier.Notification("warning", "failed to update.");
        }
      })
    }
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  getCustomerGroupNameErrorMessage() {
    return 'Enter customerGroup name';
  }

}

