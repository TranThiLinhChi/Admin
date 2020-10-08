import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SanphamComponent } from './sanpham/sanpham.component';
import { DautrangComponent } from './dautrang/dautrang.component';
import { CuoitrangComponent } from './cuoitrang/cuoitrang.component';

@NgModule({
  declarations: [
    AppComponent,
    SanphamComponent,
    DautrangComponent,
    CuoitrangComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
