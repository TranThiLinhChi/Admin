import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, Inject, Injector, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FileUpload } from 'primeng/fileupload';
import { RowToggler } from 'primeng/table';
import 'rxjs/add/operator/takeUntil';
import { BaseComponent } from '../../../common/base-component';
import { MustMatch } from '../../../helpers/must-match.validator';
declare var $: any;
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent extends BaseComponent implements OnInit {
  public users: any;
  public user: any;
  public totalRecords: any;
  public pageSize = 3;
  public page = 1;
  public uploadFiles: any[] = [];
  public formsearch: any;
  public formdata: any;
  public doneSetupForm: any;
  public showUpdateModal: any;
  public isCreate: any;
  public list: any;

  submitted = false;
  @ViewChild(FileUpload, { static: false }) file_image: FileUpload;



  constructor(private fb: FormBuilder, injector: Injector) {
    super(injector);
   }

  ngOnInit(): void {
    this.formsearch = this.fb.group({
      'name': [''],
      'username': ['']
    });
    //this.search()
       this._api.get('api/users/get-all').
      takeUntil(this.unsubcribe).subscribe(res => {
        this.list = res;
        console.log(this.list);

      });
  }

  loadPage(page) {
    this._api.post('api/users/search', { page: page, pageSize: this.pageSize }).
      takeUntil(this.unsubcribe).subscribe(res => {
        this.users = res.data;
        this.totalRecords = res.totalItems;
        this.pageSize = res.pageSize;
      });
  }

  search() {
    this.page = 1;
    this.pageSize = 5;
    this._api.post('api/users/search', {
      page: this.page, pageSize: this.pageSize,
      name: this.formsearch.get('name').value, username: this.formsearch.get('username').value
    }).takeUntil(this.unsubcribe).subscribe(
      res => {
        this.users = res.data;
        this.totalRecords = res.totalItems;
        this.pageSize = res.pageSize;
      }
    );
  }



    pwdCheckValidator(control){
    var filteredStrings = {search:control.value, select:'@#!$%&*'}
    var result = (filteredStrings.select.match(new RegExp('[' + filteredStrings.search + ']', 'g')) || []).join('');
    if(control.value.length < 6 || !result){
        return {password: true};
    }
  }

  get f() { return this.formdata.controls;}


  onSubmit(value) {
    this.submitted = true;
    if (this.formdata.invalid) {
      return;
    }
    if (this.isCreate) {
      this.getEncodeFromImage(this.file_image).subscribe((data: any): void => {
        let data_image = data == '' ? null : data;
        let tmp = {

          name: value.name,
          address: value.address,
          username: value.username,
          password: value.password,
          role: value.role

        };
        this._api.post('api/users/create-user', tmp).takeUntil(this.unsubcribe).subscribe(res => {
          alert("Add success!");
          this.search();
          this.closeModal();
        });
      });

    } else {
      this.getEncodeFromImage(this.file_image).subscribe((data: any): void => {
        let data_image = data == '' ? null : data;
        let tmp = {
        //  image_url: data_image,
          name: value.name,
          address: value.address,
          username: value.username,
          password: value.password,
          role: value.role

        };
        this._api.post('api/users/update-user', tmp).takeUntil(this.unsubcribe).subscribe(
          res => {
            alert("Update success!");
            this.search();
            this.closeModal();
          }
        );
      });
    }
  }


  onDelete(id) {
    this._api.get('api/users/delete-user/'+ id).takeUntil(this.unsubcribe).subscribe(
      res => {
        alert('Delete success!');
        this.search();
      }
    );
  }

  Reset() {
    this.user = null;
    this.formdata = this.fb.group({
      'name': ['', Validators.required],
      'address': ['', Validators.required],
      'username': ['', Validators.required],
      'password': ['', Validators.required, this.pwdCheckValidator],
      'enterpassword': ['', Validators.required],
      'role': [this.roles[0].value, Validators.required],
    }, {
      validator: MustMatch('password', 'enterpassword')
    });

  }

  createModal() {
    //this.doneSetupForm = false;
    this.showUpdateModal = true;
    this.isCreate = true;
    this.user = null;

      $('#createUserModal').modal('toggle');
      this.formdata = this.fb.group({
        'name': ['', Validators.required],
        'address': ['', Validators.required],
        'username': ['', Validators.required],
        'password': ['', Validators.required, this.pwdCheckValidator],
        'enterpassword': ['', Validators.required],
        'role': [this.roles[0].value, Validators.required]
      },
        {
          validator: MustMatch('password', 'enterpassword')

        });
    this.formdata.get('role').setValue(this.roles[0].value);
    this.doneSetupForm = true;

  }


  public openUpdateModal(id) {
   // this.doneSetupForm = false;
    this.showUpdateModal = true;
    this.isCreate = false;
    setTimeout(() => {
     // $("#createuserModal").modal("toggle");
      this._api.get('api/users/get-by-id/' + id).takeUntil(this.unsubcribe).subscribe(res => {
        this.user = res;
         $('#createUserModal').modal('toggle');
        console.log(this.user);
            this.formdata = this.fb.group({
        'name': [this.user.name, Validators.required],
        'address': [this.user.address, Validators.required],
        'username': [this.user.username, Validators.required],
        'password': ['', Validators.required, this.pwdCheckValidator],
        'enterpassword': ['', Validators.required],
        'role': [this.roles[0].value, Validators.required]
      },
        {
          validator: MustMatch('password', 'enterpassword')

       });
        this.doneSetupForm = true;
      })
    }, 700)
  }

  closeModal() {
    $("#createUserModal").closest('.modal').modal('hide');
  }
}