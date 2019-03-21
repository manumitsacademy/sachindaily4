import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ReportModule } from './report/report.module';
import { SharedModule } from './shared/shared.module';
import { RouterModule} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ReportModule,
    SharedModule,
    HttpClientModule,
    RouterModule.forRoot([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
