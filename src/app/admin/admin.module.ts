import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "./shared/header/header.component";
import { ControlComponent } from "./shared/control/control.component";
import { FooterComponent } from "./shared/footer/footer.component";
import { SidebarComponent } from "./shared/sidebar/sidebar.component";
import { AdminRoutingModule } from "./admin-routing.module";
import { AgGridModule } from "ag-grid-angular";
import { ButtonRendererComponent } from "../rendered/button-renderer.component";
import { ButtonDeleteComponent } from "../rendered/button-delete.component";
import { UsuarioComponent } from "../admin/pages/usuario/usuario.component";
import { AdminComponent } from './admin.component';
import { ModalUsuarioComponent } from './modals/modal-usuario/modal-usuario.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HeaderComponent,
    ControlComponent,
    FooterComponent,
    SidebarComponent,
    UsuarioComponent,
    AdminComponent,
    ButtonRendererComponent,
    ButtonDeleteComponent,
    ModalUsuarioComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    AgGridModule.withComponents([
      ButtonRendererComponent,
      ButtonDeleteComponent,
    ]),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AdminModule {}
