import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillingHomeComponent } from './billing-home/billing-home.component';
import { routes} from './routes.billing'
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [BillingHomeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path:"billing",
        component:BillingHomeComponent
      }
    ])
  ]
})
export class BillingModule { }
