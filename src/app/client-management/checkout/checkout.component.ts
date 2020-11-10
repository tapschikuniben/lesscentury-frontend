import { Component, EventEmitter, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CartService } from 'src/app/services/cart.service';
import { NotifierService } from 'src/app/services/notifier.service';
import { UploadFilesService } from 'src/app/services/upload-product-files.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { createDebuggerStatement } from 'typescript';
import { DeliveryAddress } from '../../models/deliveryAddress';
import { DeliveryAddressService } from '../../services/deliveryAddress.service';
import { NewDeliveryAddressComponent } from '../new-delivery-address/new-delivery-address.component';
import { UpdateAddressComponent } from '../update-address/update-address.component';
import { Order } from '../../models/order';
import { AuthService } from 'src/app/_services/auth.service';
import { User } from 'src/app/models/user';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  public products = [];
  public images = [];
  public my_images = [];
  public cart_total_amaount: any;
  public delivery_address: DeliveryAddress;
  public onAddressCreation = new EventEmitter();
  public addresses = [];
  public deliveryAddressDialogRef: MatDialogRef<NewDeliveryAddressComponent>;
  public updateAddressDialogRef: MatDialogRef<UpdateAddressComponent>;
  public deliveryAddress: any;
  public client_addresses = [];
  public billing_address: any;
  public billing_address_default: boolean = true;
  public returned_user: User;
  public current_user: any;
  public cash_type_checked: boolean = false;
  public cash_channel_checked: boolean = false;
  public mobile_channel_checked: boolean = false;
  public card_channel_checked: boolean = false;
  public payment_method: {
    payment_type: string;
    payment_channel: string;
  }
  public payment_methods = [];
  public delivery_fee: number = 10;
  public order_number: string = '';


  public order: Order = {
    _id: '',
    customer_id: '',
    firstname: '',
    lastname: '',
    user_name: '',
    email: '',

    //cart details
    cart_items: this.products,

    // delivery details
    customer_contact: 0,
    is_delivery: '', // from text field
    delivery_fee: 0,
    delivery_instructions: '', // from text field
    destination: {
      shipping_address: '',
      location: '', // geolocation
    }, // from text field
    shipping_company: {
      shipping_company_name: '', // from admin
      shipping_company_contact: '', // from admin
      shipping_company_address: '', // from admin
    },
    shipping_method: '', // from admin
    shipping_zone_id: '', // from admin
    shipping_country_id: '', // from admin

    //payment details
    payment_methods: [],
    currency_code: '',
    payment_zone_id: '',
    payment_country_id: '',
    invoice_no: '',
    invoice_prefix: '',
    order_prefix_id: '',

    stage: '',

    //amount details
    commision: 0,
    sub_total: 0,
    reward: 0,
    total: 0,
    discount: 0,
    rate: {
      usd: 0,
      zwl: 0,
    },
    credits_used: 0,
    discounted_subtotal: 0,
    created_by: '',
    modified_by: '',
    created_date: new Date(),
    modified_date: new Date(),
    status: '',
    promo_code: '',
    shop_contact: 0,
    shop_email: '',
    shop_address: '',
    comment: '',
    affiliate_id: '',
    ip: '',
    order_number: '',
  };


  constructor(
    private cartService: CartService,
    private uploadProductFilesService: UploadFilesService,
    private deliveryAddressService: DeliveryAddressService,
    private notifier: NotifierService,
    private tokenStorageService: TokenStorageService,
    private dialog: MatDialog,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.getUser();
    this.getUserWithId();
    this.getCartItems();
    this.matchProductsToImages();
    this.getCartTotal();
    this.initDeliveryAddress();
    this.getAddresses();
    this.generateOrderNum();
  }

  getUser() {
    return this.current_user = this.tokenStorageService.getUser();
  }

  getUserWithId() {
    this.authService.getUserById(this.current_user.id).subscribe(returned => {
      this.returned_user = returned;
      this.initOrder();
    })
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

  initOrder() {
    console.log(this.delivery_address)
    this.order = {
      //user details
      _id: '',
      customer_id: this.returned_user._id,
      firstname: this.returned_user.first_name,
      lastname: this.returned_user.last_name,
      user_name: this.returned_user.username,
      email: this.returned_user.email,

      //cart details
      cart_items: this.products,

      // delivery details
      customer_contact: this.delivery_address.billing_address.contact,
      is_delivery: 'yes', // from text field
      delivery_fee: this.delivery_fee,
      delivery_instructions: '', // from text field
      destination: {
        shipping_address: this.delivery_address.billing_address.physical_address_line_one + ', ' + this.delivery_address.billing_address.physical_address_line_two + ', ' + this.delivery_address.billing_address.country,
        location: '', // geolocation
      }, // from text field
      shipping_company: {
        shipping_company_name: '', // from admin
        shipping_company_contact: '', // from admin
        shipping_company_address: '', // from admin
      },
      shipping_method: '', // from admin
      shipping_zone_id: '', // from admin
      shipping_country_id: '', // from admin

      //payment details
      payment_methods: this.payment_methods,
      currency_code: 'usd',
      payment_zone_id: '',
      payment_country_id: '',
      invoice_no: '',
      invoice_prefix: '',
      order_prefix_id: '',
      order_number: this.order_number,

      stage: 'created',

      //amount details
      commision: 0,
      sub_total: this.cart_total_amaount,
      reward: 0,
      total: this.cart_total_amaount + this.delivery_fee,
      discount: 0,
      rate: {
        usd: 0,
        zwl: 0,
      },
      credits_used: 0,
      discounted_subtotal: 0,
      created_by: this.returned_user.first_name + ' ' + this.returned_user.last_name,
      modified_by: this.returned_user.first_name + ' ' + this.returned_user.last_name,
      created_date: new Date(Date.now()),
      modified_date: new Date(Date.now()),
      status: '',
      promo_code: '',
      shop_contact: 263718633585,
      shop_email: 'sales@lesscentury.co.za',
      shop_address: 'Bradfield, Bulawayo',
      comment: '',
      affiliate_id: '',
      ip: '',
    }
    console.log('my order', this.order)
  }

  getAddresses() {
    this.deliveryAddressService.getAllDeliveryAddresss().subscribe(returned_addresses => {
      this.addresses = returned_addresses.filter(c => c.user_id === this.current_user.id)
      this.addresses.map(x => {
        this.client_addresses = x.addresses;
      })
      this.getBillingAddress(this.addresses);
      if (this.addresses.length === 0) {
        this.openNewDeliveryAddressDialog();
      }
    })
  }

  getBillingAddress(addresses) {
    this.billing_address_default = true;
    const addressId = addresses[0]?.id;
    if (addressId) {
      this.deliveryAddressService.getDeliveryAddressById(addressId).subscribe(returnedaddress => {
        this.delivery_address = returnedaddress;
        this.initOrder();
      })
    }
  }

  addressList() {
    this.billing_address_default = false;
  }

  getCartItems() {
    this.cartService.getItems().map(product =>
      this.products.push(product));
  }

  getCartTotal() {
    this.cartService.cartTotalAmount().then(element => {
      this.cart_total_amaount = element;
    })
  }

  onSelectAddress(address) {
    console.log('the address', address)
    this.deliveryAddressService.updateDeliveryAddress(address).subscribe(updateaddress => {
      this.delivery_address = updateaddress;
      if (updateaddress) {
        this.notifier.Notification("success", "successfully updated.");
      } else {
        this.notifier.Notification("warning", "failed to update.");
      }
    })
  }

  openNewDeliveryAddressDialog() {
    this.deliveryAddressDialogRef = this.dialog.open(NewDeliveryAddressComponent, { width: '50%', maxHeight: '620px' });

    this.deliveryAddressDialogRef.updatePosition({
      top: '4%',
    });

    this.deliveryAddressDialogRef.afterClosed().subscribe(() => {
      this.getAddresses();
    });
  }

  updateDeliveryAddressDialog() {
    this.updateAddressDialogRef = this.dialog.open(UpdateAddressComponent, {
      width: '50%',
      maxHeight: '620px',
      data: this.addresses,
    });

    this.updateAddressDialogRef.updatePosition({
      top: '4%',
    });

    this.updateAddressDialogRef.afterClosed().subscribe(() => {
      this.getAddresses();
    });
  }

  matchProductsToImages() {
    this.cartService.getItems().map(element => {
      this.uploadProductFilesService.getFiles().subscribe(data => {
        this.images = data;
        let my_images = (this.images['productFiles'].filter(u => u.product_id === element._id))
        my_images.map(w => {
          this.my_images.push(w['avatar'][0])
        })
      })
    })
  }

  newDeliveryAddress(address: DeliveryAddress) {
    console.log('delivery address', this.delivery_address)
    this.deliveryAddressService.addDeliveryAddress(address).subscribe(created_address => {
      this.onAddressCreation.emit(created_address)
      this.notifier.Notification("success", "delivery address created.");
    })
  }

  //select address
  //toggle switch changes
  updatingDeliveryAddress(currentdeliveryAddress) {
    this.deliveryAddressService.updateDeliveryAddress(currentdeliveryAddress).subscribe(updateddeliveryAddress => {
      this.deliveryAddress = updateddeliveryAddress;
      if (updateddeliveryAddress) {
        this.notifier.Notification("success", "successfully updated.");
      } else {
        this.notifier.Notification("warning", "failed to update.");
      }
    })
  }

  newOrder(order) {
    console.log('my order', order)
  }

  generateOrderNum() {
    //this.order_number = Math.floor((Math.random() * 1000000000) + 1);
    let year = new Date().getFullYear();
    let month = new Date().getMonth() + 1;
    let day = new Date().getDate();
    let fulldate = year + '-' + month + '-' + day;
    let randomchars = Math.random().toString(36).substring(2, 6).toLocaleUpperCase();
    return this.order_number = fulldate + '/' + randomchars;
  }

  onSelectCash(event) {
    this.cash_type_checked = event;
    if (this.cash_type_checked) {
      this.payment_method = {
        payment_type: 'cash on delivery',
        payment_channel: ''
      }
    } else {
      this.payment_methods = this.payment_methods.filter(({ payment_type }) => payment_type !== "cash on delivery");
      console.log(this.payment_methods)
    }

  }

  onSelectCashChannel(event) {
    this.cash_channel_checked = event;
    if (this.cash_channel_checked) {
      this.payment_method = {
        payment_type: 'cash on delivery',
        payment_channel: 'cash'
      }
      this.payment_methods.push(this.payment_method);
      console.log(this.payment_methods)
    } else {
      this.payment_methods = this.payment_methods.filter(({ payment_channel }) => payment_channel !== "cash");
      console.log(this.payment_methods)
    }
  }

  onSelectMobileChannel(event) {
    this.mobile_channel_checked = event;
    if (this.mobile_channel_checked) {
      this.payment_method = {
        payment_type: 'cash on delivery',
        payment_channel: 'mobile money'
      }
      this.payment_methods.push(this.payment_method);
      console.log(this.payment_methods)
    } else {
      this.payment_methods = this.payment_methods.filter(({ payment_channel }) => payment_channel !== "mobile money");
      console.log(this.payment_methods)
    }
  }

  onSelectCardChannel(event) {
    this.card_channel_checked = event;
    if (this.card_channel_checked) {
      this.payment_method = {
        payment_type: 'cash on delivery',
        payment_channel: 'card'
      }
      this.payment_methods.push(this.payment_method);
      console.log(this.payment_methods)
    } else {
      this.payment_methods = this.payment_methods.filter(({ payment_channel }) => payment_channel !== "card");
      console.log(this.payment_methods)
    }
  }

  onSelectPaypal(event) {
    console.log('sssssssss', event)
  }

}
