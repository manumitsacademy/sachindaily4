import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CustomerHomeComponent } from './customer-home/customer-home.component';
import { RouterModule } from '@angular/router';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { PauseDeliveryComponent } from './pause-delivery/pause-delivery.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SubscribeDeliveryComponent } from './subscribe-delivery/subscribe-delivery.component';
import { RangeSliderComponent } from './range-slider/range-slider.component';
import { ChangeSubscriptionComponent } from './change-subscription/change-subscription.component';
import { ProductCardComponent } from './product-card/product-card.component';
@NgModule({
  declarations: [CustomerHomeComponent, RangeSliderComponent, CustomerListComponent,AddCustomerComponent, CustomerDetailsComponent, PauseDeliveryComponent, SubscribeDeliveryComponent, ChangeSubscriptionComponent, ProductCardComponent],
  imports: [
    NgbModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path:'customer',
        component:CustomerHomeComponent,
        children:[
          {
            path:'customerList',
            component:CustomerListComponent
          },
          {
            path:'addCustomer',
            component:AddCustomerComponent
          },
          {
            path:'customerDetails',
            component:CustomerDetailsComponent
          },
          {
            path:"",
            component:CustomerListComponent
          }
        ]
      }
    ])
  ]
})
export class CustomerModule { }
