import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { TypeComponent } from './type/type.component';
import { SharedModule } from 'primeng/api';
import { OrderComponent } from './order/order.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'primeng/fileupload';
import { NgxPaginationModule } from 'ngx-pagination';
import { EditorModule } from '@tinymce/tinymce-angular';
import { ToastModule } from 'primeng/toast';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {DropdownModule} from 'primeng/dropdown';
import {NgxPrintModule} from 'ngx-print';


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
    FileUploadModule,
    NgxPaginationModule,
    EditorModule,
    ToastModule,
    Ng2SearchPipeModule,
    FormsModule,
    NgxPrintModule




  ],

})
export class ProductModule { }