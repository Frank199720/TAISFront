import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ButtonRendererComponent } from 'src/app/rendered/button-renderer.component';
import { ProcesoService } from '../../../../services/proceso.service';
import { Proceso } from '../../../../interfaces/proceso';

@Component({
  selector: 'app-indicador',
  templateUrl: './indicador.component.html',
  styleUrls: ['./indicador.component.scss']
})
export class IndicadorComponent implements OnInit {
  idProceso:number;
  listaProceso:Proceso[];
  
  ruc:string;
  @ViewChild("contenido") myModalIndicador: ElementRef;
  constructor(private modal:NgbModal,private ProcesoService:ProcesoService) {
    this.frameworkComponents = {
      buttonRenderer: ButtonRendererComponent,
      
    };
    
  }
  ngOnInit(): void {
    let jsonParse= JSON.parse(localStorage.getItem('infoUser'));
    this.ruc=jsonParse.ruc_empresa;
    this.getProcesos();
  }
  getProcesos(){
    this.ProcesoService.getProcesos(this.ruc).subscribe((data:Proceso[])=>{
      this.listaProceso=data;
    })
  }
  frameworkComponents: any;
  addorEdit:boolean = false;
  
  rowDataClicked1 = {};
  columnDefs = [
    { field: "nom_indicador", headerName: "Nombre"},
    { field: "preg_tres", headerName: "Encargado"},
    { field: "nom_proceso", headerName: "Proceso" },
    { field: "nom_subproceso", headerName: "SubProceso" },
    
    {
      cellRenderer: "buttonRenderer",
      cellRendererParams: {
        onClick: this.editProceso.bind(this),
        class: "btn btn-primary btn-sm",
        icon: "fas fa-edit",
      },
      width: "70px",
    },
    {
      cellRenderer: "buttonRenderer",
      cellRendererParams: {
        onClick: this.viewSub.bind(this),
        class: "btn btn-success btn-sm",
        label:'Subprocesos'
      },
      
    },
  ];

  rowData = [
    { make: "Toyota", model: "Celica", price: 35000 },
    { make: "Ford", model: "Mondeo", price: 32000 },
    { make: "Porsche", model: "Boxter", price: 72000 },
  ];
  agregarIndicador() {
    this.modal.open(this.myModalIndicador,{ size: 'xl' ,backdrop:false });
  }
  editProceso(value) {}
  viewSub(value) {
    //
  }
  

}
