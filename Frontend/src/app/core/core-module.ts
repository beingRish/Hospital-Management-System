import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Nav } from '../components/nav/nav';



@NgModule({
  declarations: [],
  imports: [
    CommonModule, 
    HttpClientModule, 
    Nav,
  ],
  exports: [Nav],
})
export class CoreModule { }
