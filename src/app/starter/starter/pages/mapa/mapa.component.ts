import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Mapa } from "src/app/interfaces/mapa";
import { ButtonRendererComponent } from "src/app/rendered/button-renderer.component";
import { MapaService } from "../../../../services/mapa.service";
import { ProcesoService } from "../../../../services/proceso.service";
import { Proceso } from "../../../../interfaces/proceso";
import { SubprocesoService } from "../../../../services/subproceso.service";
import { Subproceso } from 'src/app/interfaces/subproceso';
import { showConfirm } from "src/app/functions/alerts";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: "app-mapa",
  templateUrl: "./mapa.component.html",
  styleUrls: ["./mapa.component.scss"],
})
export class MapaComponent implements OnInit {
  @ViewChild("modalPerspectiva") myModalPerspectiva: ElementRef;
  @ViewChild("modalObjetivo") myModalObjetivo: ElementRef;
  frameworkComponents: any;
  rowData: any;
  idProceso: number;
  listaProcesos: Proceso[];
  listaSubProcesos: Subproceso[];
  mapa: Mapa = {
    nom_mapa: null,
    id_subproceso: null,
  };
  idMapa:number;
  columnDefs = [
    { field: "id_mapa", headerName: "ID", hide: true },
    { field: "nom_mapa", headerName: "Nombre" },
    { field: "nom_subproceso", headerName: "Sub proceso" },

    
    
    {
      cellRenderer: "buttonRenderer",
      cellRendererParams: {
        onClick: this.getPerspectiva.bind(this),
        class: "btn btn-outline-success btn-sm",
        icon: "",
        label:'Perspectivas'
      },
      
    },
    {
      cellRenderer: "buttonRenderer",
      cellRendererParams: {
        onClick: this.getObjetivos.bind(this),
        class: "btn btn-outline-primary btn-sm",
        icon: "",
        label:'Objetivos'
      },
      
    },
  ];
  constructor(
    private MapaService: MapaService,
    private ProcesoService: ProcesoService,
    private SubprocesoService: SubprocesoService,
    private modal:NgbModal
  ) {
    this.frameworkComponents = {
      buttonRenderer: ButtonRendererComponent,
    };
  }
  ruc: string;
  ngOnInit(): void {
    let jsonParse = JSON.parse(localStorage.getItem("infoUser"));
    this.ruc = jsonParse.ruc_empresa;
    this.ProcesoService.getProcesos(this.ruc).subscribe((data: Proceso[]) => {
      this.listaProcesos = data;
    });
    this.getMapas();
  }
  getMapas() {
    this.MapaService.getMapas(this.ruc).subscribe((data: any) => {
      this.rowData = data;
    });
  }
  deleteMapa() {}
  construirMapa() {}
  addMapa() {
    let numero= this.rowData.length;
    this.mapa.nom_mapa='Mapa 0'+numero;
    this.MapaService.insertMapa(this.mapa).subscribe((data:any)=>{
      if(data.success){
        this.getMapas();
        showConfirm('Exito',data.message);
      }
    })
  }
  actualizarData() {
    this.SubprocesoService.getSubProcesos(this.idProceso).subscribe((data:Subproceso[])=>{
      this.listaSubProcesos=data;
    })
  }
  getPerspectiva(e){
    this.idMapa= e.rowData.id_mapa;
    this.modal.open(this.myModalPerspectiva,{size:'lg'});
  }
  getObjetivos(e){
    this.idMapa= e.rowData.id_mapa;
    this.modal.open(this.myModalObjetivo,{size:'lg'});
  }
}
