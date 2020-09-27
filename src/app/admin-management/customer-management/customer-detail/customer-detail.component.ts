import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Customer } from 'src/app/models/customer';
import { NotifierService } from 'src/app/services/notifier.service';
import { CustomerService } from 'src/app/services/customer.service';
import { CustomerGroupService } from '../../../services/customerGroup.service';
import { CustomerGroup } from 'src/app/models/customerGroup';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {

  public customer: Customer;
  public appcustomerGroups: CustomerGroup[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public customerdatainfo: any,
    private customerService: CustomerService,
    private customerGroupService: CustomerGroupService,
    private notifier: NotifierService,
    public dialogRef: MatDialogRef<CustomerDetailComponent>,
  ) { }

  ngOnInit(): void {
    this.initializeCustomer();
    this.getCustomerGroups();
    this.getCustomer();
  }

  initializeCustomer(): void {
    this.customer = {
      _id: '',
      user_name: '',
      email: '',
      customer_group_id: '',
      contact: '',
      password: '',
      status: '',
      first_name: '',
      last_name: '',
      address: '',
      country: '',
      city: '',
      mail_status: '',
      delete_flag: '',
      last_login: new Date(Date.now()),
      newsletters: '',
      created_by: '',
      created_date: new Date(Date.now()),
      modified_date: new Date(Date.now()),
      modified_by: '',
      ip_address: '',
      role: 'customer',
    }
  }

  // get customer groups
  getCustomerGroups(): void {
    this.customerGroupService.getAllCustomerGroups().subscribe(returnedcustomerGroups => {
      this.appcustomerGroups = returnedcustomerGroups;
    })
  }


  // get customer by Id
  getCustomer() {
    const customerId = this.customerdatainfo.id
    if (customerId) {
      this.customerService.getCustomerById(customerId).subscribe(returnedcustomer => {
        this.customer = returnedcustomer;
      })
    }
  }

  // update customer
  updateCustomer(currentcustomer: Customer): void {
    {
      this.customerService.updateCustomer(currentcustomer).subscribe(updatedcustomer => {
        this.customer = updatedcustomer;
        if (updatedcustomer) {
          this.notifier.Notification("success", "successfully updated.");
          this.getCustomer();
        } else {
          this.notifier.Notification("warning", "failed to update.");
        }
      })
    }
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  getCustomerNameErrorMessage() {
    return 'Enter customer name';
  }

}
