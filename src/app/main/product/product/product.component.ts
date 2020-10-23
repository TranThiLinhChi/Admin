import { Component, Injector, OnInit, ViewChild } from '@angular/core';

import { Observable } from 'rxjs';
import { BaseComponent } from 'src/app/common/base-component';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/takeUntil';
import { FormBuilder, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';

declare var $: any;
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent extends BaseComponent implements OnInit {

  constructor(injector: Injector, private fb: FormBuilder) {
    super(injector);
  }
  formData: any;
  name_pro: any;
  id_type: any;
  quantity: any;
  unit_price: any;
  promotion_price: any;
  image_pro: any;
  description: any;
  //detail: any;
  status: any;
  //message: any;
  products: any;
  product: any;
    ngOnInit(): void {
      this.formData = this.fb.group({
        name: ['', Validators.required],
        category_id:  [''],
        quantity:  [''],
        unit_price:  [''],
        promotion_price: [''],
        image: [''],
        description:  [''],
        //detail: [''],
        status:  [''],
          });
          Observable.combineLatest(
            this._api.get('api/product/get-all'),
      
          ).takeUntil(this.unsubcribe).subscribe(
            res=> {
              this.products = res[0];
              console.log(this.products);
            // setTimeout(() => {
            //   this.loadScripts();
            // });
            }, err => { })
        }
      
        getProduct(id: any) {
          Observable.combineLatest(
            this._api.get('api/product/get-by-id/'+id)
          ).takeUntil(this.unsubcribe).subscribe(
            res => {
              this.product = res;
              console.log(this.product)
            }
          )
        }
        create() {
          $('#formModal').modal('toggle');
         }
       
         onSubmitCreate(value: any) {
       
           console.log(value);
           this._api.post('api/product/create-product', {
             name_pro: value.name,
             id_type: value.catergory_id,
             quantity: +value.quantity,
             unit_price: +value.unit_price,
             promotion_price: +value.promotion_price,
             image_pro: value.image,
             description: value.description,
             //detail: value.detail,
             status: +value.status,     
           }).takeUntil(this.unsubcribe).subscribe((res) => {
            // this.message = res;
             
           });
           alert('Thêm thành công!');
           location.reload();
           }

        delete(id: any) {
            Observable.combineLatest(
              this._api.get('api/product/delete/' + id)
            ).takeUntil(this.unsubcribe).subscribe(
              res => {
                        this.products = this.products.filter(val => val.product_id !== id);               
                } 
              )
               alert('Xóa thành công!');
               location.reload();
          }
        
}
