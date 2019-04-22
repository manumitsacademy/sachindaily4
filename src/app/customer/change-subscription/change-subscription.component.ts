import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SubscriptionService } from 'src/app/subscription/subscription.service';
@Component({
  selector: 'app-change-subscription',
  templateUrl: './change-subscription.component.html',
  styleUrls: ['./change-subscription.component.css']
})
export class ChangeSubscriptionComponent implements OnInit {

  closeResult: string;
  subscribeProductForm:FormGroup;
  minusDisableFlag=true;
  @Input() CustomerDetails;
  @Input() ProductDetails;
  @Output() refreshSubscription = new EventEmitter();
  everyDayFlag: boolean;
  selectedDaysFlag: boolean;
  constructor(  private modalService: NgbModal,public fb:FormBuilder,
                public sS:SubscriptionService,public router:Router) { }
  ngOnInit(){
    //console.log(this.ProductDetails)
    this.subscribeProductForm = this.fb.group({
      mobileNumber:this.CustomerDetails.mobileNumber,
      wing:this.CustomerDetails.wing,
      flatNumber:this.CustomerDetails.flatNumber,
      startDate:['',[Validators.required]],
      endDate:['',[Validators.required]],
      productId:[this.ProductDetails._id.$oid],
      productName:[this.ProductDetails.productName],
      quantity:[0,[Validators.required,Validators.min(0.5)]],
      timestamp:(new Date().getTime())
    })
  }
    subscribeProduct(){
      this.sS.modifySubscription(this.subscribeProductForm.value).subscribe((res)=>{
        console.log(res);
        alert("Product Subscribed Successfully");
        //this.router.navigate(["/customer/customerList"])
        this.refreshSubscription.emit();
      })
    }
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      
      var sd=this.subscribeProductForm.controls['startDate'].value;
      var ed=this.subscribeProductForm.controls['endDate'].value;
      this.subscribeProductForm.controls['startDate'].setValue((Date.UTC(sd.year,sd.month-1,sd.day)/1000).toString());
      this.subscribeProductForm.controls['endDate'].setValue((Date.UTC(ed.year,ed.month-1,ed.day)/1000).toString());
      
     console.log(this.subscribeProductForm.value)
      this.subscribeProduct()
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
  minus(){
    if(this.subscribeProductForm.controls['quantity'].value>0){
      var x = this.subscribeProductForm.controls['quantity'].value;
      x-=0.5;
      this.subscribeProductForm.controls['quantity'].setValue(x)
      if(x==0){
        this.minusDisableFlag=true;
      }
    }
  }
  plus(){
    var x = this.subscribeProductForm.controls['quantity'].value;
      x+=0.5;
      this.subscribeProductForm.controls['quantity'].setValue(x)
      this.minusDisableFlag=false;
  }
  selectedDays(){
    this.everyDayFlag=false;
    this.selectedDaysFlag=true;
    this.subscribeProductForm.controls['endDate'].setValue("");
  }
  everyDay(){
    this.selectedDaysFlag=false;
    this.everyDayFlag=true;
    this.subscribeProductForm.controls['endDate'].setValue({ year: 2098, month: 6, day: 20 });
     
    console.log(" this.subscribeProductForm.", this.subscribeProductForm)
  }
}
//06/20/2098
//4054076800