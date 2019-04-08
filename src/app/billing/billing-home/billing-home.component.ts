import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/products/product.service';
import { DeliveryService } from 'src/app/delivery/delivery.service';
import { _ } from 'underscore';
@Component({
  selector: 'app-billing-home',
  templateUrl: './billing-home.component.html',
  styleUrls: ['./billing-home.component.css']
})
export class BillingHomeComponent implements OnInit {

  constructor(public pS:ProductService,public dS:DeliveryService) { }

  ngOnInit() {
    this.dS.getAllDeliveries().subscribe(res=>{
      console.log("All deliveries::",res);
      var x = _.groupBy(res,'mobileNumber');
      for(let key in x){
        var y = _.groupBy(x[key],'productId')
        console.log("y:::",y);
        for(let k in y){
          var z = y[k].reduce((a,b)=>{
            if(a.cost){
              return (a.cost*a.quantity)+(b.cost*b.quantity);
            }            
            else{
              return a+(b.cost*b.quantity);
            }
          })
          console.log(z);
        }
        x[key]=y;
      }
      console.log(x);
    })
  }

}
