import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule } from '@angular/forms'
import { ReportsHomeComponent } from './reports-home/reports-home.component';
import { RouterModule } from '@angular/router';
import { WingWiseReportComponent } from './wing-wise-report/wing-wise-report.component';
import { FlatWiseReportComponent } from './flat-wise-report/flat-wise-report.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductnamePipe } from './productname.pipe';
import {MatTableModule} from '@angular/material/table';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [ReportsHomeComponent, WingWiseReportComponent, FlatWiseReportComponent, ProductnamePipe],
  imports: [
    CommonModule,HttpClientModule,MatTableModule,FormsModule,NgbModule,MatTabsModule,MatButtonModule,
    RouterModule.forChild([
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
