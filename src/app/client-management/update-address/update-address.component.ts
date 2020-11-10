import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeliveryAddress } from 'src/app/models/deliveryAddress';
import { DeliveryAddressService } from 'src/app/services/deliveryAddress.service';
import { NotifierService } from 'src/app/services/notifier.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-update-address',
  templateUrl: './update-address.component.html',
  styleUrls: ['./update-address.component.css']
})
export class UpdateAddressComponent implements OnInit {
  public delivery_address: DeliveryAddress;
  public current_user: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public addressdatainfo: any,
    public dialogRef: MatDialogRef<UpdateAddressComponent>,
    private deliveryAddressService: DeliveryAddressService,
    private notifier: NotifierService,
    private tokenStorageService: TokenStorageService,
  ) { }

  ngOnInit(): void {
    this.getUser();
    this.initDeliveryAddress();
    this.getBillingAddress();
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

  getUser() {
    this.current_user = this.tokenStorageService.getUser();
  }

  // get product by Id
  getBillingAddress() {
    const addressId = this.addressdatainfo[0].id
    console.log(addressId)
    if (addressId) {
      this.deliveryAddressService.getDeliveryAddressById(addressId).subscribe(returnedaddress => {
        this.delivery_address = returnedaddress;
      })
    }
  }

  updateAddress(address: DeliveryAddress) {
    this.delivery_address.addresses.push({ ...this.delivery_address.billing_address });
    this.deliveryAddressService.updateDeliveryAddress(address).subscribe(updateaddress => {
      this.delivery_address = updateaddress;
      if (updateaddress) {
        this.notifier.Notification("success", "successfully updated.");
      } else {
        this.notifier.Notification("warning", "failed to update.");
      }
    })
  }

  close(): void {
    this.dialogRef.close();
  }
}
