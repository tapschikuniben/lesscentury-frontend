import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NotifierService } from 'src/app/services/notifier.service';
import { BannerDetailComponent } from '../banner-detail/banner-detail.component';
import { NewBannerComponent } from '../new-banner/new-banner.component';
import { Banner } from '../../../models/banner';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { FileUploadService } from 'src/app/services/file-upload.service';


@Component({
  selector: 'app-banner-info',
  templateUrl: './banner-info.component.html',
  styleUrls: ['./banner-info.component.css']
})
export class BannerInfoComponent implements OnInit {

  public banner: Banner;
  public bannerDialogRef: MatDialogRef<NewBannerComponent>;
  public bannerDetailRef: MatDialogRef<BannerDetailComponent>;
  public BannerData: any = [];
  public dataSource: MatTableDataSource<Banner>;
  @ViewChild('banner_paginator', { static: true }) banner_paginator: MatPaginator;
  public pageSizeOptions: number[] = [];
  public pageEvent: PageEvent;
  public pageSize = 5;
  public displayedBannerColumns: string[] = ['avatar', 'banner_name', 'status', 'view', 'action'];
  public Banners: any = [];


  constructor(
    private dialog: MatDialog,
    private notifier: NotifierService,
    private fileUploadService: FileUploadService,
  ) { }

  ngOnInit(): void {
    this.getBanners();
    this.initializePageSizeOptions();
  }

  //create new banner
  openNewBannerDialog() {
    this.bannerDialogRef = this.dialog.open(NewBannerComponent, { width: '50%', maxHeight: '620px' });

    this.bannerDialogRef.updatePosition({
      top: '4%',
    });

    this.bannerDialogRef.afterClosed().subscribe(result => {
      //this.getAllBanners();
    });
  }

  //getting all banners
  getBanners() {
    this.fileUploadService.getBanners().subscribe((res) => {
      this.BannerData = res['banners'];
      this.dataSource = new MatTableDataSource<Banner>(this.BannerData);
      setTimeout(() => {
        this.dataSource.paginator = this.banner_paginator;
      }, 0);
    })
  }

  //confirm to delete banner
  confirmDialog(myindex: number, e): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, { width: '500px', data: "NB: This can not be undone" });

    dialogRef.updatePosition({
      top: '8%',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if (result) {
        this.deleteBanner(myindex, e);
        this.notifier.Notification("success", "successfully deleted.");
      } else {
        this.notifier.Notification("warning", "action aborted");
      }
    });
  }

  //deleting banner
  deleteBanner(index: number, e) {
    const data = this.dataSource.data;
    console.log('page index', this.banner_paginator.pageIndex)
    data.splice((this.banner_paginator.pageIndex * this.banner_paginator.pageSize) + index, 1);
    this.dataSource.data = data;
    this.fileUploadService.deleteBanner(e.id).subscribe()
  }

  //open banner details
  openBannerDetail(selected): void {
    const dialogRef = this.dialog.open(BannerDetailComponent, {
      width: '50%',
      maxHeight: '620px',
      data: selected,
    });

    dialogRef.updatePosition({
      top: '4%',
    });

    dialogRef.afterClosed().subscribe(result => {
      //this.getAllBanners();
    });
  }

  public applyBannerFilter(filterValue: any) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.paginator.firstPage();
  }

  initializePageSizeOptions(): void {
    for (let i = 5; i <= 1000; i += 5) {
      this.pageSizeOptions.push(i);
    }
  }

}
