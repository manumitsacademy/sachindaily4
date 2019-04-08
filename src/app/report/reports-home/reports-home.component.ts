import { Component, OnInit } from '@angular/core';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reports-home',
  templateUrl: './reports-home.component.html',
  styleUrls: ['./reports-home.component.css']
})
export class ReportsHomeComponent implements OnInit {
  
  model: NgbDateStruct;
  date: {year: number, month: number};

  constructor(private calendar: NgbCalendar,public router:Router) { }

  ngOnInit() {
  }

  generateReport(sDate){
    console.clear();
    console.log("Log cleared at generate Report")
    console.log(sDate);
    this.router.navigate(['/reports/wingWiseReport'],{queryParams: sDate })
  }
}
