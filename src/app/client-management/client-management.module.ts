import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { ClientLayoutComponent } from '../layouts/client-layout/client-layout.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CarouselComponent } from './carousel/carousel.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FeaturedComponent } from './featured/featured.component';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FooterComponent } from './footer/footer.component';
import { MaterialElevationDirective } from './../directives/material-elevation.directive';
import { ProductInfoComponent } from './product-info/product-info.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CategoryComponent } from './category/category.component';
import { WomenComponent } from './women/women.component';
import { MenComponent } from './men/men.component';
import { MatRadioModule } from '@angular/material/radio';
import { NewDeliveryAddressComponent } from './new-delivery-address/new-delivery-address.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatBadgeModule } from '@angular/material/badge';
import { UpdateAddressComponent } from './update-address/update-address.component';

const ClientManagementRoutes: Routes = [
  {
    path: '',
    component: ClientLayoutComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'product/:id', component: ProductInfoComponent },
      { path: 'cart', component: CartComponent },
      { path: 'checkout', component: CheckoutComponent },
      { path: 'category', component: CategoryComponent },
      { path: 'women', component: WomenComponent },
      { path: 'men', component: MenComponent },
    ]
  },
];

@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent,
    CarouselComponent,
    FeaturedComponent,
    FooterComponent,
    MaterialElevationDirective,
    ProductInfoComponent,
    CartComponent,
    CheckoutComponent,
    CategoryComponent,
    WomenComponent,
    MenComponent,
    NewDeliveryAddressComponent,
    UpdateAddressComponent],
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgbModule,
    RouterModule.forChild(ClientManagementRoutes),
    FormsModule,
    FlexLayoutModule,

    //MatModules
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatRadioModule,
    MatCheckboxModule,
    MatIconModule,
    MatBadgeModule,
  ],
  entryComponents: [
    NewDeliveryAddressComponent
  ]
})
export class ClientManagementModule { }
