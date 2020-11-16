import { Component, Injector, OnInit } from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { BaseComponent } from 'src/app/common/base-component';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/takeUntil';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.css']
})
export class TypeComponent  extends BaseComponent implements OnInit {

  constructor(injector: Injector, private fb: FormBuilder) {
    super(injector)
   }
   category: any;

  ngOnInit(): void {
    Observable.combineLatest(
      this._api.get('api/category/get-menu'),

    ).takeUntil(this.unsubcribe).subscribe(
      res=> {
        this.category = res[0];
        console.log(this.category);
      // setTimeout(() => {
      //   this.loadScripts();
      // });
     }, err => {})
  }
}
