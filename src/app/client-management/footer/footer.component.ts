import { Component, EventEmitter, OnInit } from '@angular/core';
import { Subscription } from 'src/app/models/subscription';
import { NotifierService } from 'src/app/services/notifier.service';
import { SubscriptionService } from '../../services/subscription.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})

export class FooterComponent implements OnInit {

  public todays_date: Date;
  public subscription: Subscription;
  public onSubscriptionCreation = new EventEmitter();

  constructor(
    private subscriptionService: SubscriptionService,
    private notifier: NotifierService,
  ) { }

  ngOnInit(): void {
    this.getDate();
    this.initializeSubscription();
  }

  initializeSubscription(): void {
    this.subscription = {
      _id: '',
      email: '',
      timestamp: new Date(Date.now()),
    }
  }

  getDate() {
    this.todays_date = new Date(Date.now());
  }

  createSubscription(subscription: Subscription): void {
    this.subscriptionService.addSubscription(subscription).subscribe(createdsub => {
      if (createdsub) {
        this.onSubscriptionCreation.emit(createdsub);
        this.notifier.Notification("success", "subscription was successfully.");
        this.initializeSubscription();
      }
    })
  }

}
