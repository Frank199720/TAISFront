import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { EmpresaComponent } from './pages/empresa/empresa.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';


const routes: Routes = [
  {path: '',
  component: AdminComponent,
  children: [
    {
      path: 'usuario',
      component: UsuarioComponent
    },
    {
      path:'empresas',
      component:EmpresaComponent
    }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
