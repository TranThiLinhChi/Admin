import { Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/common/base-component';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/takeUntil';
import { Observable } from 'rxjs';

declare var $: any;
declare var Swal: any;
declare var Toast: any;
declare var toastr: any;
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent extends BaseComponent implements OnInit {
  location: Location;
  list_order: any;
  bill_detail: any;
  constructor(injector: Injector) {
    super(injector);
   }

  ngOnInit(): void {
    // Lay danh sach don hang

    Observable.combineLatest(
      this._api.get('api/bill/get-bills')).takeUntil(this.unsubcribe).subscribe(
        res => {
          this.list_order = res[0];
          console.log(this.list_order);
          setTimeout(() => {

          });
        }
    )



  }

 ViewDetail(id) {
    console.log(id);

     Observable.combineLatest(
      this._api.get('api/bill/get-bill-detail/' + id)).takeUntil(this.unsubcribe).subscribe(
        res => {
          this.bill_detail = res[0];
          console.log(this.bill_detail);
          setTimeout(() => {
             $('#myBill').modal('toggle');

          });
        }
      );
  }

  deleteBill(id: any) {

   // $('#confirmModal').modal('toggle');

 Swal.fire({
  title: 'Bạn chắc chắn chứ?',
  text: "Bạn không thẩy khôi phục lại đơn hàng!",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Đúng, xóa ngay bây giờ!'
 }).then((result) => {
  if (result.isConfirmed) {

     Observable.combineLatest(
      this._api.get('api/bill/delete-bill/' + id)).takeUntil(this.unsubcribe).subscribe(
        res => {
          //location.reload();
          this.list_order = this.list_order.filter(val => val.id != id);
        }
      );

    Swal.fire(
      'Đã xóa!',
      'Đơn hàng đã bị xóa!.',
      'success'
    );
  }
})
   }
  // changeStatus(id: any, msg: any) {
  //   console.log(msg);
  //    Observable.combineLatest(
  //     this._api.get('api/bill/change-status/' + id + '/' +msg)).takeUntil(this.unsubcribe).subscribe(
  //       res => {
  //         $(document).Toasts('create', {
  //           class: 'bg-light',
  //           icon:'',
  //           title: 'Thành công!',
  //           subtitle: '',
  //          //delay: 10,
  //           fixed: false,
  //           body: 'Thay đổi trạng thái đơn hàng thành công!'
  //         });

  //           location.reload();



  //       }
  //     );
  // }

}