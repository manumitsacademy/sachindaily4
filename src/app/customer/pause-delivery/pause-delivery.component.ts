import { Component, OnInit, Input } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SubscriptionService } from 'src/app/subscription/subscription.service';
@Component({
  selector: 'app-pause-delivery',
  templateUrl: './pause-delivery.component.html',
  styleUrls: ['./pause-delivery.component.css']
})
export class PauseDeliveryComponent{

  closeResult: string;
  pauseDeliveryForm:FormGroup;
  @Input() CustomerDetails;
  
  constructor(  private modalService: NgbModal,public fb:FormBuilder,
                public sS:SubscriptionService,public router:Router) {
                 
    
  }
  ngOnInit(){
    this.pauseDeliveryForm = this.fb.group({
      mobileNumber:this.CustomerDetails.mobileNumber,
      wing:this.CustomerDetails.wing,
      flatNumber:this.CustomerDetails.flatNumber,
      startDate:[],
      endDate:[]
    })
  }
    pauseDelvery(){
      this.sS.pauseDelivery(this.pauseDeliveryForm.value).subscribe((res)=>{
        console.log(res);
        alert("All deliveries paused at given dates");
        this.router.navigate(["/customer/customerList"])
      })
    }
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      
      var sd=this.pauseDeliveryForm.controls['startDate'].value;
      var ed=this.pauseDeliveryForm.controls['endDate'].value;
      this.pauseDeliveryForm.controls['startDate'].setValue((Date.UTC(sd.year,sd.month-1,sd.day)/1000).toString());
      this.pauseDeliveryForm.controls['endDate'].setValue((Date.UTC(ed.year,ed.month-1,ed.day)/1000).toString());
      console.log(this.pauseDeliveryForm.value)
      this.pauseDelvery()
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {  
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
