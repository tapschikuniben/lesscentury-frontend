import { Component, OnInit, ViewChild, ɵConsole } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NotifierService } from 'src/app/services/notifier.service';
import { Subscription } from '../../../models/subscription';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { SubscriptionService } from 'src/app/services/subscription.service';


@Component({
  selector: 'app-subscription-info',
  templateUrl: './subscription-info.component.html',
  styleUrls: ['./subscription-info.component.css']
})
export class SubscriptionInfoComponent implements OnInit {

  public subscription: Subscription;
  public SubscriptionData: any = [];
  public dataSource: MatTableDataSource<Subscription>;
  @ViewChild('subscription_paginator', { static: true }) subscription_paginator: MatPaginator;
  public pageSizeOptions: number[] = [];
  public pageEvent: PageEvent;
  public pageSize = 5;
  public displayedSubscriptionColumns: string[] = ['email', 'date_subscribed', 'action'];
  public Subscriptions: any = [];


  constructor(
    private dialog: MatDialog,
    private notifier: NotifierService,
    private subscriptionService: SubscriptionService
  ) { }

  ngOnInit(): void {
    this.getSubscriptions();
    this.initializePageSizeOptions();
  }

  public applyProductFilter(filterValue: any) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.paginator.firstPage();
  }

  //getting all subscriptions
  getSubscriptions() {
    this.subscriptionService.getAllSubscriptions().subscribe((res) => {
      this.SubscriptionData = res;
      this.dataSource = new MatTableDataSource<Subscription>(this.SubscriptionData);
      setTimeout(() => {
        this.dataSource.paginator = this.subscription_paginator;
      }, 0);
    })
  }

  //confirm to delete subscription
  confirmDialog(myindex: number, e): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, { width: '500px', data: "NB: This can not be undone" });

    dialogRef.updatePosition({
      top: '8%',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if (result) {
        this.deleteSubscription(myindex, e);
        this.notifier.Notification("success", "successfully deleted.");
      } else {
        this.notifier.Notification("warning", "action aborted");
      }
    });
  }

  //deleting subscription
  deleteSubscription(index: number, e) {
    const data = this.dataSource.data;
    console.log('page index', this.subscription_paginator.pageIndex)
    data.splice((this.subscription_paginator.pageIndex * this.subscription_paginator.pageSize) + index, 1);
    this.dataSource.data = data;
    this.subscriptionService.deleteSubscription(e.id).subscribe()
  }

  public applySubscriptionFilter(filterValue: any) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.paginator.firstPage();
  }

  initializePageSizeOptions(): void {
    for (let i = 5; i <= 1000; i += 5) {
      this.pageSizeOptions.push(i);
    }
  }

}

