import { Component, EventEmitter, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DeliveryAddress } from 'src/app/models/deliveryAddress';
import { DeliveryAddressService } from 'src/app/services/deliveryAddress.service';
import { NotifierService } from 'src/app/services/notifier.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-new-delivery-address',
  templateUrl: './new-delivery-address.component.html',
  styleUrls: ['./new-delivery-address.component.css']
})
export class NewDeliveryAddressComponent implements OnInit {
  public delivery_address: DeliveryAddress;
  public onAddressCreation = new EventEmitter();
  public current_user: any;
  public addresses = [];

  constructor(
    private notifier: NotifierService,
    private tokenStorageService: TokenStorageService,
    private deliveryAddressService: DeliveryAddressService,
    public dialogRef: MatDialogRef<NewDeliveryAddressComponent>,
  ) { }

  ngOnInit(): void {
    this.getUser();
    this.initDeliveryAddress();
    this.getAddresses();
  }

  getAddresses() {
    this.deliveryAddressService.getAllDeliveryAddresss().subscribe(returned_addresses => {
      this.addresses = returned_addresses.filter(c => c.user_id === this.current_user.id)
      console.log('my addresses', this.addresses)
    })
  }

  getUser() {
    this.current_user = this.tokenStorageService.getUser();
  }

  initDeliveryAddress() {
    this.delivery_address = {
      _id: '',
      user_id: this.current_user.id,
      billing_address: {
        physical_address_line_one: '',
        physical_address_line_two: '',
        country: '',
        zip_code: '',
        contact: 0,
      },
      addresses: [],
    }
  }

  newDeliveryAddress(address: DeliveryAddress) {
    this.delivery_address.addresses.push({ ...this.delivery_address.billing_address });
    this.deliveryAddressService.addDeliveryAddress(address).subscribe(created_address => {
      if (address.billing_address.physical_address_line_one !== '' &&
        address.billing_address.country !== '' &&
        address.billing_address.zip_code !== '' &&
        address.billing_address.contact) {
        this.onAddressCreation.emit(created_address)
        this.notifier.Notification("success", "delivery address created.");
        this.initDeliveryAddress();
        this.dialogRef.close();
      } else {
        this.notifier.Notification("warning", "please fill all inputs")
      }
    })
  }

  close(): void {
    this.dialogRef.close();
  }

}
