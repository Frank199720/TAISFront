import { ContentComponent } from './starter/content/content.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StarterComponent } from './starter/starter.component';
import { UsuarioComponent } from '../admin/pages/usuario/usuario.component';
import { ProcesoComponent } from './starter/pages/proceso/proceso.component';
import { PerfilComponent } from './starter/pages/perfil/perfil.component';


const routes: Routes = [
  {
    path: '',
    component: StarterComponent,
    children: [
      {
        path: '',
        component: ContentComponent
      },
      {
        path:'procesos',
        component: ProcesoComponent
      },
      {
        path:'perfil',
        component: PerfilComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StarterRoutingModule { }
