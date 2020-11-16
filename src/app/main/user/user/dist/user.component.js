"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var fileupload_1 = require("primeng/fileupload");
require("rxjs/add/operator/takeUntil");
var base_component_1 = require("../../../common/base-component");
var must_match_validator_1 = require("../../../helpers/must-match.validator");
var UserComponent = /** @class */ (function (_super) {
    __extends(UserComponent, _super);
    function UserComponent(fb, injector) {
        var _this = _super.call(this, injector) || this;
        _this.fb = fb;
        _this.pageSize = 3;
        _this.page = 1;
        _this.uploadFiles = [];
        _this.submitted = false;
        return _this;
    }
    UserComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.formsearch = this.fb.group({
            'name': [''],
            'username': ['']
        });
        //this.search()
        this._api.get('api/users/get-all').
            takeUntil(this.unsubcribe).subscribe(function (res) {
            _this.list = res;
            console.log(_this.list);
        });
    };
    UserComponent.prototype.loadPage = function (page) {
        var _this = this;
        this._api.post('api/users/search', { page: page, pageSize: this.pageSize }).
            takeUntil(this.unsubcribe).subscribe(function (res) {
            _this.users = res.data;
            _this.totalRecords = res.totalItems;
            _this.pageSize = res.pageSize;
        });
    };
    UserComponent.prototype.search = function () {
        var _this = this;
        this.page = 1;
        this.pageSize = 5;
        this._api.post('api/users/search', {
            page: this.page, pageSize: this.pageSize,
            name: this.formsearch.get('name').value, username: this.formsearch.get('username').value
        }).takeUntil(this.unsubcribe).subscribe(function (res) {
            _this.users = res.data;
            _this.totalRecords = res.totalItems;
            _this.pageSize = res.pageSize;
        });
    };
    UserComponent.prototype.pwdCheckValidator = function (control) {
        var filteredStrings = { search: control.value, select: '@#!$%&*' };
        var result = (filteredStrings.select.match(new RegExp('[' + filteredStrings.search + ']', 'g')) || []).join('');
        if (control.value.length < 6 || !result) {
            return { password: true };
        }
    };
    Object.defineProperty(UserComponent.prototype, "f", {
        get: function () { return this.formdata.controls; },
        enumerable: false,
        configurable: true
    });
    UserComponent.prototype.onSubmit = function (value) {
        var _this = this;
        this.submitted = true;
        if (this.formdata.invalid) {
            return;
        }
        if (this.isCreate) {
            this.getEncodeFromImage(this.file_image).subscribe(function (data) {
                var data_image = data == '' ? null : data;
                var tmp = {
                    name: value.name,
                    address: value.address,
                    username: value.username,
                    password: value.password,
                    role: value.role
                };
                _this._api.post('api/users/create-user', tmp).takeUntil(_this.unsubcribe).subscribe(function (res) {
                    alert("Add success!");
                    _this.search();
                    _this.closeModal();
                });
            });
        }
        else {
            this.getEncodeFromImage(this.file_image).subscribe(function (data) {
                var data_image = data == '' ? null : data;
                var tmp = {
                    //  image_url: data_image,
                    name: value.name,
                    address: value.address,
                    username: value.username,
                    password: value.password,
                    role: value.role
                };
                _this._api.post('api/users/update-user', tmp).takeUntil(_this.unsubcribe).subscribe(function (res) {
                    alert("Update success!");
                    _this.search();
                    _this.closeModal();
                });
            });
        }
    };
    UserComponent.prototype.onDelete = function (id) {
        var _this = this;
        this._api.get('api/users/delete-user/' + id).takeUntil(this.unsubcribe).subscribe(function (res) {
            alert('Delete success!');
            _this.search();
        });
    };
    UserComponent.prototype.Reset = function () {
        this.user = null;
        this.formdata = this.fb.group({
            'name': ['', forms_1.Validators.required],
            'address': ['', forms_1.Validators.required],
            'username': ['', forms_1.Validators.required],
            'password': ['', forms_1.Validators.required, this.pwdCheckValidator],
            'enterpassword': ['', forms_1.Validators.required],
            'role': [this.roles[0].value, forms_1.Validators.required]
        }, {
            validator: must_match_validator_1.MustMatch('password', 'enterpassword')
        });
    };
    UserComponent.prototype.createModal = function () {
        //this.doneSetupForm = false;
        this.showUpdateModal = true;
        this.isCreate = true;
        this.user = null;
        $('#createUserModal').modal('toggle');
        this.formdata = this.fb.group({
            'name': ['', forms_1.Validators.required],
            'address': ['', forms_1.Validators.required],
            'username': ['', forms_1.Validators.required],
            'password': ['', forms_1.Validators.required, this.pwdCheckValidator],
            'enterpassword': ['', forms_1.Validators.required],
            'role': [this.roles[0].value, forms_1.Validators.required]
        }, {
            validator: must_match_validator_1.MustMatch('password', 'enterpassword')
        });
        this.formdata.get('role').setValue(this.roles[0].value);
        this.doneSetupForm = true;
    };
    UserComponent.prototype.openUpdateModal = function (id) {
        var _this = this;
        // this.doneSetupForm = false;
        this.showUpdateModal = true;
        this.isCreate = false;
        setTimeout(function () {
            // $("#createuserModal").modal("toggle");
            _this._api.get('api/users/get-by-id/' + id).takeUntil(_this.unsubcribe).subscribe(function (res) {
                _this.user = res;
                $('#createUserModal').modal('toggle');
                console.log(_this.user);
                _this.formdata = _this.fb.group({
                    'name': [_this.user.name, forms_1.Validators.required],
                    'address': [_this.user.address, forms_1.Validators.required],
                    'username': [_this.user.username, forms_1.Validators.required],
                    'password': ['', forms_1.Validators.required, _this.pwdCheckValidator],
                    'enterpassword': ['', forms_1.Validators.required],
                    'role': [_this.roles[0].value, forms_1.Validators.required]
                }, {
                    validator: must_match_validator_1.MustMatch('password', 'enterpassword')
                });
                _this.doneSetupForm = true;
            });
        }, 700);
    };
    UserComponent.prototype.closeModal = function () {
        $("#createUserModal").closest('.modal').modal('hide');
    };
    __decorate([
        core_1.ViewChild(fileupload_1.FileUpload, { static: false })
    ], UserComponent.prototype, "file_image");
    UserComponent = __decorate([
        core_1.Component({
            selector: 'app-user',
            templateUrl: './user.component.html',
            styleUrls: ['./user.component.css']
        })
    ], UserComponent);
    return UserComponent;
}(base_component_1.BaseComponent));
exports.UserComponent = UserComponent;