import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { UploadFilesService } from 'src/app/services/upload-product-files.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
  providers: [NgbCarouselConfig]
})
export class CarouselComponent implements OnInit {

  public ProductData: [] = [];
  public images = [];

  public title = 'New Arrivals';
  public product_name = 'DENIM JACKETS';
  public product_description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt utlabore et doloremagna aliqua. Quis ipsum sus-pendisse ultrices gravida. Risus commodo viverra maecenas accumsanlacus velfacilisis.';

  showNavigationArrows = false;
  showNavigationIndicators = false;

  /*images = [1055, 194, 368].map((n) => `https://picsum.photos/id/${n}/900/500`);*/


  //   =[
  //   {img:'../../assets/img/banner4.png',heading1:'Promotion1',heading2:'event1',heading3:'brief info'},
  //   {img:'../../assets/img/banner6.jpg',heading1:'Promotion2',heading2:'event2',heading3:'brief info2'},
  // ]

  constructor(
    config: NgbCarouselConfig,
    private uploadProductFilesService: UploadFilesService) {
    // customize default values of carousels used by this component tree
    config.showNavigationArrows = true;
    config.showNavigationIndicators = true;
  }

  ngOnInit(): void {
    this.getProductImages();
  }

  // get product images
  getProductImages(): void {
    this.uploadProductFilesService.getFiles().subscribe(data => {
      this.ProductData = data;
      this.ProductData['productFiles'].map(element => {
        this.images.push(...element.avatar);
      });
    })
  }
}
