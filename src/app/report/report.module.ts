import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsHomeComponent } from './reports-home/reports-home.component';
import { RouterModule } from '@angular/router';
import { WingWiseReportComponent } from './wing-wise-report/wing-wise-report.component';
import { FlatWiseReportComponent } from './flat-wise-report/flat-wise-report.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [ReportsHomeComponent, WingWiseReportComponent, FlatWiseReportComponent],
  imports: [
    CommonModule,HttpClientModule,
    RouterModule.forChild([
      {
        path:'',
        component:ReportsHomeComponent
      },
      {
        path:'reports',
        component:ReportsHomeComponent,
        children:[
          {
            path:'wingWiseReport',
            component:WingWiseReportComponent
          },
          {
            path:'flatWiseReport',
            component:FlatWiseReportComponent
          }
        ]
      }
      
    ])
  ]
})
export class ReportModule { }
