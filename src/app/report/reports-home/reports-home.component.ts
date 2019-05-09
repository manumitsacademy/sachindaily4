import { Component, OnInit } from '@angular/core';
import {NgbDateStruct, NgbCalendar, NgbDate} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-reports-home',
  templateUrl: './reports-home.component.html',
  styleUrls: ['./reports-home.component.css'],
  providers: [DatePipe]
})
export class ReportsHomeComponent implements OnInit {
  
  model: NgbDateStruct;
  date: {year: number, month: number};
  i;
  
  myDate = new Date();
  currdate = this.datePipe.transform(this.myDate, 'dd');
  currmonth = this.datePipe.transform(this.myDate, 'M');
  curryear =  this.datePipe.transform(this.myDate, 'yyyy');
  newdate: NgbDateStruct = { year: parseInt(this.curryear), month:  parseInt(this.currmonth), day:  parseInt(this.currdate) };
  // { year: 2020, month: 7, day: 14 }; // July, 14 1789

  constructor(private calendar: NgbCalendar,public router:Router,private datePipe: DatePipe) { 
   
  }

  isDisabled = (date: NgbDate, current: {date: number,month: number}) => date.after(this.newdate) ;

  ngOnInit() {
    // for(this.i=this.currdate;this.i>=this.currdate;this.i++){
      console.log(this.currdate);
    //   // const isDisabled = (date: NgbDate, current: {month: number}) => date.day === 13;
    // }
  }


  generateReport(sDate){
    console.clear();
    console.log("Log cleared at generate Report")
    console.log(sDate);
    this.router.navigate(['/home/reports/wingWiseReport'],{queryParams: sDate })
  }
}
 