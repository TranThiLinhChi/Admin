import { Component, Injector, OnInit,ViewChild } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'
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
  color: any;
  size: any;
  //detail: any;
  status: any;
  message: any;
  products: any;
  product: any;
  catergory: any;
  submitted: any = false;

  public pageSize = 3;
  public page = 1;
  public uploadedFiles: any[] = [];
  public formsearch: any;
  totalRecords: any;
  config: any;


  @ViewChild(FileUpload, { static: false }) file_image: FileUpload;

  ngOnInit(): void {

  this.formData = this.fb.group({
  name_pro: ['', Validators.required],
  id_type:  [''],
  quantity:  [''],
  unit_price:  [''],
  color:[''],
  size:[''],
  promotion_price: [''],
  image_pro: [''],
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
      setTimeout(() => {
      //   this.loadScripts();
      });
      }, err => { })
      Observable.combineLatest(this._api.get('api/category/get-menu')).takeUntil(this.unsubcribe)
      .subscribe(res => {
        this.catergory = res[0];

    }, err => {})
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

  delete(product_id: any) {
    Observable.combineLatest(
      this._api.get('api/product/delete-product/' + product_id)
    ).takeUntil(this.unsubcribe).subscribe(
      res => {
                this.products = this.products.filter(val => val.product_id!== product_id);               
        } 
      )
       alert('Xóa thành công!');
       location.reload();
  }



  update(id: any) {


    Observable.combineLatest(
    this._api.get('api/product/get-by-id/'+id)
    
  ).subscribe(
    res => {
      this.product = res[0];
      console.log(this.product);
      console.log(id);
      this.id_type= this.product.id_type;
      setTimeout(() => {
        this.formData.controls['product_id'].setValue(this.product.product_id);
        this.formData.controls['name_pro'].setValue(this.product.name_pro);
        this.formData.controls['color'].setValue(this.product.color);
        this.formData.controls['size'].setValue(this.product.size);
        this.formData.controls['quantity'].setValue(this.product.quantity);
        this.formData.controls['unit_price'].setValue(this.product.unit_price);
        this.formData.controls['promotion_price'].setValue(this.product.promotion_price);
        this.formData.controls['description'].setValue(this.product.description);
        this.formData.controls['id_type'].setValue(this.product.id_type);
        this.formData.controls['status'].setValue(this.product.status);
        $(".modal-title").html("Sửa sản phẩm");
        $('#formModal').modal('toggle');
      //  this.formData.reset();


      });

    }
  )
}


  //Show modal
  create() {
    this.formData.reset();
    $(".modal-title").html("Thêm sản phẩm");
    $('#formModal').modal('toggle');
    }


    onSubmitCreate(value: any){
      this.submitted = true;
            if (value.product_id == null) {
              this.getEncodeFromImage(this.file_image).subscribe((data: any): void => {
                let data_image = data == '' ? null : data;
                console.log(value);
                this._api.post('api/product/create-product', {
                  name_pro: value.name_pro,
                  image_pro: data_image,
                  id_type: value.id_type,
                  color: value.color,
                  size: +value.size,
                  quantity: +value.quantity,
                  unit_price: +value.unit_price,
                  promotion_price: +value.promotion_price,
                  description: value.description,
                  //detail: value.detail,
                  status: +value.status,
                }).takeUntil(this.unsubcribe).subscribe((res) => {
                  this.message = res;
                  this.products.unshift(this.message);
                  $("#formModal").modal('hide');
                });
                alert('Thêm thành công!');
                console.log(this.product)
                location.reload();
              });
            } else {
              console.log(value);
              this.getEncodeFromImage(this.file_image).subscribe((data: any): void => {
                let data_image = data == '' ? null : data;
                this._api.post('api/product/update-product/' + value.product_id, {
                  name_pro: value.name_pro,
                  id_type: value.id_type,
                  color: value.color,
                  size: +value.size,
                  quantity: +value.quantity,
                  unit_price: +value.unit_price,
                  promotion_price: +value.promotion_price,
                  image_pro: data_image,
                  description: value.description,
                  //detail: value.detail,
                  status: +value.status,
                }).takeUntil(this.unsubcribe).subscribe((res) => {
                  // this.message = res;
                  //    this.products[this.findIndexById(this.message.iD_product)] = this.message;
                  //  location.reload();
                  $("#formModal").modal('hide');
                });
                location.reload();
              });
            }
    }
  
    search() {
      this.page = 1;
      this.pageSize = 5;
      this._api.post('api/product/search', { page: this.page, pageSize: this.pageSize, id_type: this.formsearch.get('id_type') })
        .takeUntil(this.unsubcribe).subscribe(
          res => {
            this.products = res.data;
            this.totalRecords = res.totalRecords;
            this.pageSize = res.pageSize;
          }
        );
    }
    findIndexById(id: number): number {
      let index = -1;
      for (let i = 0; i < this.products.length; i++) {
          if (this.products[i].product_id == id) {
              index = i;
              break;
          }
      }

      return index;
  }

  }