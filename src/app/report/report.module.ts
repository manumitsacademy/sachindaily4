import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsHomeComponent } from './reports-home/reports-home.component';
import { RouterModule } from '@angular/router';
import { WingWiseReportComponent } from './wing-wise-report/wing-wise-report.component';
import { FlatWiseReportComponent } from './flat-wise-report/flat-wise-report.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductnamePipe } from './productname.pipe';
import {MatTableModule} from '@angular/material/table';
@NgModule({
  declarations: [ReportsHomeComponent, WingWiseReportComponent, FlatWiseReportComponent, ProductnamePipe],
  imports: [
    CommonModule,HttpClientModule,MatTableModule,
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
