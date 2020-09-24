import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { AdminLayoutComponent } from '../layouts/admin-layout/admin-layout/admin-layout.component';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CatalogComponent } from './catalog-management/catalog/catalog.component';
import { ProductStatsComponent } from './catalog-management/product-stats/product-stats.component';
import { NewProductComponent } from './catalog-management/new-product/new-product.component';
import { ProductDetailComponent } from './catalog-management/product-detail/product-detail.component';
import { NewCategoryComponent } from './catalog-management/new-category/new-category.component';
import { CategoryDetailComponent } from './catalog-management/category-detail/category-detail.component';
import { DashboardComponent } from './dashboard-management/dashboard/dashboard.component';
import { SalesComponent } from './sales-management/sales/sales.component';
import { CustomersComponent } from './customer-management/customers/customers.component';
import { ServicesComponent } from './services-management/services/services.component';
import { CategoryInfoComponent } from './catalog-management/category-info/category-info.component';
import { ProductInfoComponent } from './catalog-management/product-info/product-info.component';

const AdminManagementRoutes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
    ]
  },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: 'sales', component: SalesComponent },
    ]
  },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: 'catalog', component: CatalogComponent },
    ]
  },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: 'customers', component: CustomersComponent },
    ]
  },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: 'services', component: ServicesComponent },
    ]
  },
];


@NgModule({
  declarations: [CatalogComponent, ProductStatsComponent, NewProductComponent, ConfirmDialogComponent, ProductDetailComponent, NewCategoryComponent, CategoryDetailComponent, CategoryInfoComponent, ProductInfoComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatIconModule,
    MatSelectModule,
    MatOptionModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule,
    MatDividerModule,
    MatTableModule,
    MatSortModule,
    MatListModule,
    MatDialogModule,
    MatCardModule,
    MatTabsModule,
    MatPaginatorModule,
    MatIconModule,
    MatSliderModule,
    MatSlideToggleModule,
    RouterModule.forChild(AdminManagementRoutes),
  ],
  exports: [RouterModule]
})
export class AdminManagementModule { }
