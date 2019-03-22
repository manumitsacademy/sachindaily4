import { Pipe, PipeTransform } from '@angular/core';
import { ReportService } from './report.service';

@Pipe({
  name: 'productname'
})
export class ProductnamePipe implements PipeTransform {
  constructor(public reportService:ReportService){}
  transform(value: any, args?: any): any {
   return this.reportService.getProductDetailsById(value).subscribe((res)=>{return res})   
  }

}
