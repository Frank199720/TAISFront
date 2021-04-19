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
  @ViewChild("contenido") myModalIndicador: ElementRef;
  constructor(private modal:NgbModal,private ProcesoService:ProcesoService,private IndicadorService:IndicadorService) {
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

  rowData:any;
  agregarIndicador() {
    if(this.idProceso){
      this.modal.open(this.myModalIndicador,{ size: 'lg' ,backdrop:false });
    }else{
      showError('Error','Seleccione un subproceso');
    }
    
  }
  editProceso(value) {}
  viewSub(value) {
    //
  }
  receptIndicador(indicador:Indicador){
    if(this.isedit){

    }else{
      this.IndicadorService.insertIndicador(indicador).subscribe((data:any)=>{
        if(data.success){
          this.modal.dismissAll();
          showConfirm('Exito',data.message);
        }
      })
    }
  }

}
