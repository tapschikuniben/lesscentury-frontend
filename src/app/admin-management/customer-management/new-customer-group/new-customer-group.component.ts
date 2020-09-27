import { Component, EventEmitter, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CustomerGroup } from 'src/app/models/customerGroup';
import { NotifierService } from 'src/app/services/notifier.service';
import { CustomerGroupService } from 'src/app/services/customerGroup.service';

@Component({
  selector: 'app-new-customer-group',
  templateUrl: './new-customer-group.component.html',
  styleUrls: ['./new-customer-group.component.css']
})
export class NewCustomerGroupComponent implements OnInit {

  public customerGroup: CustomerGroup;
  public onCustomerGroupCreation = new EventEmitter();
  public selected_sku_status: boolean = true;

  constructor(
    private customerGroupService: CustomerGroupService,
    private notifier: NotifierService,
    public dialogRef: MatDialogRef<NewCustomerGroupComponent>,
  ) { }

  ngOnInit(): void {
    // initialising customerGroups
    this.initializeCustomerGroup();
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

  addCustomerGroup(customerGroup: CustomerGroup): void {
    this.customerGroupService.addCustomerGroup(customerGroup).subscribe(createdcustomerGroup => {
      if (createdcustomerGroup) {
        this.onCustomerGroupCreation.emit(createdcustomerGroup);
        this.notifier.Notification("success", "customerGroup successfully saved.");
        this.initializeCustomerGroup();
      }
    })
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  getCustomerGroupNameErrorMessage() {
    return 'Enter customerGroup name';
  }

}
