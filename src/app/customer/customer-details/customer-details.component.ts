import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import { HttpClient } from '@angular/common/http';
import { SubscriptionService } from 'src/app/subscription/subscription.service';
import { ProductService } from 'src/app/products/product.service';
import { UnsubscriptionError } from 'rxjs';
import { DataService } from 'src/app/data.service';
@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {

  constructor(public aR:ActivatedRoute,public http:HttpClient,
              public sS:SubscriptionService,public pS:ProductService,public dS:DataService) { }
  customerDetails;
  subscribedProducts;
  unsubscribedProducts:any;
  ngOnInit() {     
    this.getSubscriptions();
  }
  getSubscriptions(){
    this.aR.queryParams.subscribe((res)=>{
      this.customerDetails=res;
      this.dS.getSubscribedProductDetailsOfCustomer(res.mobileNumber).subscribe((products)=>{
        
        products.subscribe((res)=>{
          console.log("subscribed Products",res);  
          this.subscribedProducts=res;                
        });
      });
      this.dS.getUnSubscribedProductDetailsOfCustomer(res.mobileNumber).subscribe((products)=>{
        products.subscribe((res)=>{
          console.log("unsubscribed Products",res);
          this.unsubscribedProducts=res;
        });
      });
    })      
  }
}
