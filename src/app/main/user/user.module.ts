import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'primeng/api';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { DropdownModule } from 'primeng/dropdown';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  {
    path: 'user', component: UserComponent
  },
];

@NgModule({
  declarations: [UserComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    TableModule,

    FileUploadModule,
    DropdownModule,
    NgbModule,




  ]
})
export class UserModule { }