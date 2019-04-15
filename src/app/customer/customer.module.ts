import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CustomerHomeComponent } from './customer-home/customer-home.component';
import { RouterModule } from '@angular/router';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';

@NgModule({
  declarations: [CustomerHomeComponent, CustomerListComponent,AddCustomerComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild([
      {
        path:'customer',
        component:CustomerHomeComponent,
        children:[
          {
            path:'customerList',
            component:CustomerListComponent
          }
        ]
      },
      {
        path:'addCustomer',
        component:AddCustomerComponent
      }
    ])
  ]
})
export class CustomerModule { }
