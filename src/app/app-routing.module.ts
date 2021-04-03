import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AdminModule } from './admin/admin.module';


const routes: Routes = [
  {
    path: '',
    component:LoginComponent
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
