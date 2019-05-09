import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ProductService } from 'src/app/products/product.service';
import { SubscriptionService } from 'src/app/subscription/subscription.service';
import {Router} from '@angular/router'
import { _ } from "underscore"
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
      var x = _.groupBy(res,'wing');
      this.customerList=(_.map(x,(a)=>{return a.sort(function(i,j){ return Number(i.flatNumber)-Number(j.flatNumber)});}))
                        .flat();
      console.log(this.customerList);
    })
  }
  deleteCustomer(myId){
    this.http
    .delete(`https://api.mlab.com/api/1/databases/sachindaily/collections/user/${myId}?apiKey=ClSj0HxNv3sPJwS3cZOsbZI9exWxVjqz`)
    .subscribe((res)=>{
      alert("Customer Deleted Successfully")
      this.getAllCustomers();
    })
  }
  editCustomer(customer,myId){
    customer._id=myId;
    this.router.navigate(['/home/customer/editCustomer'],{queryParams: customer })
  }
  customerDetails(id){
    this.router.navigate(["/home/customer/customerDetails"])
  }
  ngOnInit() {
  }

}
//