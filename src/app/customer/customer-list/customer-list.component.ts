import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ProductService } from 'src/app/products/product.service';
import { SubscriptionService } from 'src/app/subscription/subscription.service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  customerList;
  constructor(public http:HttpClient,public pS:ProductService,public sS:SubscriptionService,public router:Router) {
    this.getAllCustomers();
  }
  getAllCustomers(){
    this.http
    .get("https://api.mlab.com/api/1/databases/sachindaily/collections/user?apiKey=ClSj0HxNv3sPJwS3cZOsbZI9exWxVjqz")
    .subscribe((res)=>{
      console.log(res)
      this.customerList = res;
    })
  }
  deleteCustomer(myId){
    this.http
    .delete(`https://api.mlab.com/api/1/databases/sachindaily/collections/user/${myId}?apiKey=ClSj0HxNv3sPJwS3cZOsbZI9exWxVjqz`)
    .subscribe((res)=>{
      this.getAllCustomers();
    })
  }
  customerDetails(id){
    this.router.navigate(["customer/customerDetails"])
  }
  ngOnInit() {
  }

}
