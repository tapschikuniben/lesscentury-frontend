import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NotifierService } from 'src/app/services/notifier.service';
import { BrandDetailComponent } from '../brand-detail/brand-detail.component';
import { NewBrandComponent } from '../new-brand/new-brand.component';
import { Brand } from '../../../models/brand';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { FileUploadService } from 'src/app/services/file-upload.service';


@Component({
  selector: 'app-brand-info',
  templateUrl: './brand-info.component.html',
  styleUrls: ['./brand-info.component.css']
})
export class BrandInfoComponent implements OnInit {

  public brand: Brand;
  public brandDialogRef: MatDialogRef<NewBrandComponent>;
  public brandDetailRef: MatDialogRef<BrandDetailComponent>;
  public BrandData: any = [];
  public dataSource: MatTableDataSource<Brand>;
  @ViewChild('brand_paginator', { static: true }) brand_paginator: MatPaginator;
  public pageSizeOptions: number[] = [];
  public pageEvent: PageEvent;
  public pageSize = 5;
  public displayedBrandColumns: string[] = ['avatar', 'brand_name', 'status', 'view', 'action'];
  public Brands: any = [];


  constructor(
    private dialog: MatDialog,
    private notifier: NotifierService,
    private fileUploadService: FileUploadService,
  ) { }

  ngOnInit(): void {
    this.getBrands();
    this.initializePageSizeOptions();
  }

  //create new brand
  openNewBrandDialog() {
    this.brandDialogRef = this.dialog.open(NewBrandComponent, { width: '50%', maxHeight: '620px' });

    this.brandDialogRef.updatePosition({
      top: '4%',
    });

    this.brandDialogRef.afterClosed().subscribe(result => {
      //this.getAllBrands();
    });
  }

  //getting all brands
  getBrands() {
    this.fileUploadService.getBrands().subscribe((res) => {
      this.BrandData = res['brands'];
      this.dataSource = new MatTableDataSource<Brand>(this.BrandData);
      setTimeout(() => {
        this.dataSource.paginator = this.brand_paginator;
      }, 0);
    })
  }

  //confirm to delete brand
  confirmDialog(myindex: number, e): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, { width: '500px', data: "NB: This can not be undone" });

    dialogRef.updatePosition({
      top: '8%',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if (result) {
        this.deleteBrand(myindex, e);
        this.notifier.Notification("success", "successfully deleted.");
      } else {
        this.notifier.Notification("warning", "action aborted");
      }
    });
  }

  //deleting brand
  deleteBrand(index: number, e) {
    const data = this.dataSource.data;
    console.log('page index', this.brand_paginator.pageIndex)
    data.splice((this.brand_paginator.pageIndex * this.brand_paginator.pageSize) + index, 1);
    this.dataSource.data = data;
    this.fileUploadService.deleteBrand(e.id).subscribe()
  }

  //open brand details
  openBrandDetail(selected): void {
    const dialogRef = this.dialog.open(BrandDetailComponent, {
      width: '50%',
      maxHeight: '620px',
      data: selected,
    });

    dialogRef.updatePosition({
      top: '4%',
    });

    dialogRef.afterClosed().subscribe(result => {
      //this.getAllBrands();
    });
  }

  public applyBrandFilter(filterValue: any) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.paginator.firstPage();
  }

  initializePageSizeOptions(): void {
    for (let i = 5; i <= 1000; i += 5) {
      this.pageSizeOptions.push(i);
    }
  }

}
