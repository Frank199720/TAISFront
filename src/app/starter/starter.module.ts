import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { StarterRoutingModule } from "./starter-routing.module";
import { StarterComponent } from "./starter/starter.component";
import { ContentComponent } from "./starter/content/content.component";
import { ControlSideBarComponent } from "./starter/control-side-bar/control-side-bar.component";
import { MainSideBarComponent } from "./starter/main-side-bar/main-side-bar.component";
import { NavBarComponent } from "./starter/nav-bar/nav-bar.component";
import { FooterComponent } from "./starter/footer/footer.component";

import { AgGridModule } from "ag-grid-angular";
import { ButtonRendererComponent } from "../rendered/button-renderer.component";
import { ButtonDeleteComponent } from "../rendered/button-delete.component";
import { ProcesoComponent } from "./starter/pages/proceso/proceso.component";
import { PerfilComponent } from "./starter/pages/perfil/perfil.component";
import { MaterialModule } from "../admin/material/material.module";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { ModalContraseniaComponent } from "./starter/modals/modal-contrasenia/modal-contrasenia.component";
import { SubProcesoComponent } from './starter/pages/sub-proceso/sub-proceso.component';
import { IndicadorComponent } from './starter/pages/indicador/indicador.component';
import { ModalIndicadorComponent } from './starter/pages/indicador/modal-indicador/modal-indicador.component';
import { TableroComponent } from './starter/pages/tablero/tablero.component';
import { ModalTableroComponent } from './starter/pages/tablero/modal-tablero/modal-tablero.component';
import { VistaTableroComponent } from './starter/pages/tablero/vista-tablero/vista-tablero.component';
import { MapaComponent } from './starter/pages/mapa/mapa.component';
import { PerspectivaModalComponent } from './starter/pages/mapa/perspectiva-modal/perspectiva-modal.component';
import { ObjetivoModalComponent } from './starter/pages/mapa/objetivo-modal/objetivo-modal.component';


@NgModule({
  declarations: [
    StarterComponent,
    ContentComponent,
    ControlSideBarComponent,
    MainSideBarComponent,
    NavBarComponent,
    FooterComponent,
    ProcesoComponent,
    PerfilComponent,
    ModalContraseniaComponent,
    SubProcesoComponent,
    IndicadorComponent,
    ModalIndicadorComponent,
    TableroComponent,
    ModalTableroComponent,
    VistaTableroComponent,
    MapaComponent,
    PerspectivaModalComponent,
    ObjetivoModalComponent,
   
  ],
  imports: [
    CommonModule,
    
    FormsModule,
    ReactiveFormsModule,
    StarterRoutingModule,
    MaterialModule,
    AgGridModule.withComponents([
      ButtonRendererComponent,
      ButtonDeleteComponent,
    ]),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class StarterModule {}
