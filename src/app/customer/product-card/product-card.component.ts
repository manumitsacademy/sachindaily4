import { Component, OnInit, Input } from '@angular/core';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  constructor(public dS:DataService) { }
  @Input() productName;
  @Input() customerDetails;
  productDetails;
  ngOnInit() {
    this.getProductDetails(this.productName);
  }
  getProductDetails(productName){
    this.dS.getProductDetailsByProductName(productName).subscribe((productDetails)=>{
      this.productDetails=productDetails;
    })
  }
}
