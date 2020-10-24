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

const ClientManagementRoutes: Routes = [
  {
    path: '',
    component: ClientLayoutComponent,
    children: [
      { path: 'home', component: HomeComponent },
    ]
  },
];

@NgModule({
  declarations: [HomeComponent, NavbarComponent, CarouselComponent, FeaturedComponent, FooterComponent],
  imports: [
    CommonModule,
    BrowserModule,
    NgbModule,
    RouterModule.forChild(ClientManagementRoutes),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,

    //MatModules
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
  ],
})
export class ClientManagementModule { }
