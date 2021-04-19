import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ButtonRendererComponent } from 'src/app/rendered/button-renderer.component';
import { ProcesoService } from '../../../../services/proceso.service';
import { Proceso } from '../../../../interfaces/proceso';
import { showError, showConfirm } from 'src/app/functions/alerts';
import { Indicador } from '../../../../interfaces/indicador';
import { IndicadorService } from '../../../../services/indicador.service';

@Component({
  selector: 'app-indicador',
  templateUrl: './indicador.component.html',
  styleUrls: ['./indicador.component.scss']
})
export class IndicadorComponent implements OnInit {
  idProceso:number;
  listaProceso:Proceso[];
  isedit:boolean=false;
  ruc:string;
  indicador:Indicador={
    id_subproceso:null,
    preg_cinco:null,
    preg_uno:null,
    preg_cuatro:null,
    preg_dos:null,
    preg_tres:null,
    formula:null,
    nom_indicador:null,
    id_proceso:null
  }
  @ViewChild("contenido") myModalIndicador: ElementRef;
  constructor(private modal:NgbModal,private ProcesoService:ProcesoService,private IndicadorService:IndicadorService) {
    this.frameworkComponents = {
      buttonRenderer: ButtonRendererComponent,
      
    };
    
  }
  ngOnInit(): void {
    let jsonParse= JSON.parse(localStorage.getItem('infoUser'));
    this.ruc=jsonParse.ruc_empresa;
    this.getIndicadores();
    this.ProcesoService.getProcesos(this.ruc).subscribe((data:Proceso[])=>{
      this.listaProceso=data;
    })
  }
  getIndicadores(){
    this.IndicadorService.getIndicadores(this.ruc).subscribe((data)=>{
      this.rowData=data;
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
    { field: "id_indicador", headerName: "Id", hide:true },
    { field: "id_proceso", headerName: "Id2", hide:true },
    
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
        class: "btn btn-danger btn-sm",
        icon: 'far fa-trash-alt'
      },
      
    },
  ];

  rowData:any;
  agregarIndicador() {
    if(this.idProceso){
      this.indicador.id_proceso=this.idProceso;
      this.modal.open(this.myModalIndicador,{ size: 'lg' ,backdrop:false });
    }else{
      showError('Error','Seleccione un subproceso');
    }
    
  }
  editProceso(e) {
    this.isedit=true;
    this.rowDataClicked1 = e.rowData;
    let id= e.rowData.id_indicador;
    let id_proceso=e.rowData.id_proceso;
    console.log(e.rowData);
    this.IndicadorService.getIndicadorByID(id).subscribe((data:Indicador)=>{
      this.indicador=data;
      this.indicador.id_proceso=id_proceso;
      console.log(data);
      this.modal.open(this.myModalIndicador,{ size: 'xl' ,backdrop:false });
    })
    
  }
  viewSub(value) {
    //
  }
  receptIndicador(indicador:Indicador){
    if(this.isedit){
      
      this.IndicadorService.updateIndicador(indicador).subscribe((data:any)=>{
        console.log(indicador);
        if(data.success){
          //this.getIndicadores();
          showConfirm('Exito',data.message);
          this.modal.dismissAll();
        }
      })
    }else{
      this.IndicadorService.insertIndicador(indicador).subscribe((data:any)=>{
        if(data.success){
          this.getIndicadores();
          this.modal.dismissAll();
          showConfirm('Exito',data.message);
        }
      })
    }
  }

}
