import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout/admin-layout.component';

const routes: Routes = [
  // { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  // { path: 'register', component: RegisterComponent },
  // { path: 'profile', component: ProfileComponent },
  // { path: 'user', component: BoardUserComponent },
  // { path: 'mod', component: BoardModeratorComponent },
  //{ path: 'admin', component: BoardAdminComponent },
  //{ path: '', redirectTo: 'home', pathMatch: 'full' },

  // {
  //   path: '',
  //   component: AdminLayoutComponent,
  //   children: [
  //     { path: 'admin', loadChildren: '' },
  //   ]
  // },

  {
    path: '', component: AdminLayoutComponent,
    children: [{ path: '', loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule', }]
  },

  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: 'admin-management', loadChildren: '../admin-management/admin-management.module#AdminLayoutModule' },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
