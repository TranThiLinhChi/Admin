import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { MainComponent } from './main.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from '../shared/not-found/not-found.component';
//import { SharedModule } from 'primeng/api';
import { SharedModule } from '../shared/shared.module';
import { UnauthorizedComponent } from '../shared/unauthorized/unauthorized.component';
import { RoleGuard } from '../common/auth.guard';
import { Role } from '../models/role';
//import { HighchartsChartComponent } from 'highcharts-angular';
import { ChartModule } from 'primeng/chart';

export const mainRoutes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'unauthorized',
        component: UnauthorizedComponent
      },
      {
        path: 'users',
        loadChildren: () =>
          import('../main/user/user.module').then((m) => m.UserModule),
      // canActivate: [RoleGuard],
      // data: {roles: [Role.Admin]}
      },
      {
        path: 'manager',
        loadChildren: () =>
         import('../main/product/product.module').then(
            (m) => m.ProductModule
          ),
      //  canActivate: [RoleGuard],
      // data: {roles: [Role.Admin, Role.User]}
      },
    //  {path: '**', component: NotFoundComponent}
    ],
  },
];

@NgModule({
  declarations: [
  //  HighchartsChartComponent,
    SidebarComponent,
    FooterComponent,
    NavbarComponent,
    MainComponent,
    NotFoundComponent,
    DashboardComponent
  ],
  imports: [CommonModule, RouterModule.forChild(mainRoutes),SharedModule , ChartModule,]
})
export class MainModule {}