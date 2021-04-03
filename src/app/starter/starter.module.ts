import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StarterRoutingModule } from './starter-routing.module';
import { StarterComponent } from './starter/starter.component';
import { ContentComponent } from './starter/content/content.component';
import { ControlSideBarComponent } from './starter/control-side-bar/control-side-bar.component';
import { MainSideBarComponent } from './starter/main-side-bar/main-side-bar.component';
import { NavBarComponent } from './starter/nav-bar/nav-bar.component';
import { FooterComponent } from './starter/footer/footer.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';


@NgModule({
  declarations: [StarterComponent, ContentComponent, ControlSideBarComponent, MainSideBarComponent, NavBarComponent, FooterComponent, UsuarioComponent],
  imports: [
    CommonModule,
    StarterRoutingModule
  ]
})
export class StarterModule { }
