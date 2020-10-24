import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  public todays_date: Date;

  constructor() { }

  ngOnInit(): void {
    this.getDate();
  }

  getDate() {
    this.todays_date = new Date(Date.now());
  }

}
