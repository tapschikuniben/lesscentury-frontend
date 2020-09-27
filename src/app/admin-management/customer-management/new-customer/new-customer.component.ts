import { Component, EventEmitter, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Customer } from 'src/app/models/customer';
import { NotifierService } from 'src/app/services/notifier.service';
import { CustomerService } from 'src/app/services/customer.service';
import { CustomerGroupService } from '../../../services/customerGroup.service';
import { CustomerGroup } from 'src/app/models/customerGroup';

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.css']
})
export class NewCustomerComponent implements OnInit {

  public customer: Customer;
  public appcustomerGroups: CustomerGroup[];
  public onCustomerCreation = new EventEmitter();
  public selected_sku_status: boolean = true;

  constructor(
    private customerService: CustomerService,
    private customerGroupService: CustomerGroupService,
    private notifier: NotifierService,
    public dialogRef: MatDialogRef<NewCustomerComponent>,
  ) { }

  ngOnInit(): void {
    //get customer groups
    this.getCustomerGroups();
    // initialising customers
    this.initializeCustomer();
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

  addCustomer(customer: Customer): void {
    this.customerService.addCustomer(customer).subscribe(createdcustomer => {
      if (createdcustomer) {
        this.onCustomerCreation.emit(createdcustomer);
        this.notifier.Notification("success", "customer successfully saved.");
        this.initializeCustomer();
      }
    })
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  getCustomerNameErrorMessage() {
    return 'Enter customer name';
  }

}
