import { Component } from '@angular/core';
import { CustomerService } from './customer/customer.service';
import { DataService } from './data.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sachindaily2';
  constructor(public dS:DataService){}
  ngOnInit(){
    this.dS.getAllProducts().subscribe((products)=>{console.log(products)})
    this.dS.getAllCustomers().subscribe((customers)=>{console.log(customers)})
    this.dS.getSubscriptions().subscribe((products)=>{console.log(products)})
    
    this.dS.getAllUnSubscribedProductNamesofCustomer("1122").subscribe((products)=>{console.log(products)})
  }
}
