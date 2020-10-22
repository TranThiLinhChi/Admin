import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//import { BaseComponent } from './common/base-component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { DashboardComponent } from './main/dashboard/dashboard.component';
import { OrderComponent } from './main/product/order/order.component';
import { ProductComponent } from './main/product/product/product.component';
import { TypeComponent } from './main/product/type/type.component';
import { UserComponent } from './main/user/user/user.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    // BaseComponent,
    LoginComponent,
    //  MainComponent,
    //  DashboardComponent,
    //  OrderComponent,
    //  ProductComponent,
    // TypeComponent,
    // UserComponent,
    // FooterComponent,
    // NavbarComponent,
    // SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
