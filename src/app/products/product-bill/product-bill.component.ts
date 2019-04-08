import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-bill',
  templateUrl: './product-bill.component.html',
  styleUrls: ['./product-bill.component.css']
})
export class ProductBillComponent implements OnInit {
  @Input() product;
  constructor() { }
  details;
  totalCost=0;
  totalQuantity=0;
  ngOnInit() {
    console.log("product bill component",this.product)
    if(this.product){
      this.product.forEach((a)=>{       
        this.totalCost+=a.quantity*a.cost;
        this.totalQuantity +=a.quantity;
      })
    }    
  }
}
