import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';


const routes: Routes = [
  {
    path: '',
    loadChildren:()=> import('./auth/auth.module').then(m=>AuthModule)
  },
  {
    path:'admin',
    loadChildren:()=> import('./admin/admin.module').then(m=>AdminModule)
  },

  {
    path: 'starter',
    loadChildren: () => import('./starter/starter.module').then(m => m.StarterModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
