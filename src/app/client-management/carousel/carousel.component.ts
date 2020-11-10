import { Component, EventEmitter, OnInit, Output, ɵConsole } from '@angular/core';
import { NgbCarouselConfig, NgbSlideEvent } from '@ng-bootstrap/ng-bootstrap';
import { config } from 'rxjs';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UploadFilesService } from 'src/app/services/upload-product-files.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
  providers: [NgbCarouselConfig]
})
export class CarouselComponent implements OnInit {

  public ProductData: [] = [];
  public BannerData = [];
  public images = [];

  public title = '';
  public product_name = '';
  public product_description = '';
  public product_amount_from = 0;

  showNavigationArrows = false;
  showNavigationIndicators = false;
  constructor(
    config: NgbCarouselConfig,
    private uploadFile: FileUploadService
  ) {
    config.showNavigationArrows = true;
    config.showNavigationIndicators = true;
    config.interval = 5000;
  }

  ngOnInit(): void {
    this.getBanners();
  }

  //get banners
  getBanners(): void {
    this.uploadFile.getBanners().subscribe(data => {
      this.BannerData = data;
      this.BannerData['banners'].map(element => {
        this.images.push(element.avatar);
      })
    })
  }

  onSlide(slideEvent: NgbSlideEvent) {
    const imageIndex = parseInt(slideEvent.current.replace("slideId_", ""), 10);
    this.title = this.BannerData['banners'][imageIndex]['title'];
    this.product_name = this.BannerData['banners'][imageIndex]['product_name'].toUpperCase();
    this.product_description = this.BannerData['banners'][imageIndex]['product_description'];
    this.product_amount_from = this.BannerData['banners'][imageIndex]['product_amount_from'];
  }
}
