import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import { AppComponent } from './app.component';
import { ReportModule } from './report/report.module';
import { SharedModule } from './shared/shared.module';
import { RouterModule} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ReportsHomeComponent } from './report/reports-home/reports-home.component';
import { BillingModule } from './billing/billing.module';
import { CustomerModule } from './customer/customer.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { DataService } from './data.service';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ReportModule,
    SharedModule,
    BillingModule,
    HttpClientModule,
    NgbModule,
    RouterModule.forRoot([
    ]),
    BrowserAnimationsModule,
    MatTableModule,
    CustomerModule,
    SubscriptionModule
  ],
  providers: [CustomerModule,DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
