import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { TypeComponent } from './type/type.component';
import { SharedModule } from 'primeng/api';
import { OrderComponent } from './order/order.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'primeng/fileupload';


const routes: Routes = [
  {
    path: 'product',
    component: ProductComponent
  },
  { path: 'category', component: TypeComponent },
  { path: 'order', component: OrderComponent}
];
@NgModule({
  declarations: [ProductComponent, TypeComponent,OrderComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FileUploadModule

  ]
})
export class ProductModule { }
