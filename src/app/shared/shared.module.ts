import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MainareaComponent } from './mainarea/mainarea.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [HeaderComponent, MainareaComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([])
  ],
  exports:[ HeaderComponent, MainareaComponent]
})
export class SharedModule { }
