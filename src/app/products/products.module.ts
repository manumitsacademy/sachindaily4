import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductBillComponent } from './product-bill/product-bill.component';

@NgModule({
  declarations: [ProductBillComponent],
  imports: [
    CommonModule
  ],
  exports:[ProductBillComponent]
})
export class ProductsModule { }
