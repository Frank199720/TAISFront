import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { showConfirm, showError } from 'src/app/functions/alerts';
import { Subproceso } from 'src/app/interfaces/subproceso';
import { ButtonRendererComponent } from 'src/app/rendered/button-renderer.component';
import { Proceso } from '../../../../interfaces/proceso';
import { SubprocesoService } from '../../../../services/subproceso.service';

@Component({
  selector: 'app-sub-proceso',
  templateUrl: './sub-proceso.component.html',
  styleUrls: ['./sub-proceso.component.scss']
})
export class SubProcesoComponent implements OnInit {
  public  formSubProceso : FormGroup;
  @Input() proceso: Proceso;
  
  subProceso:Subproceso={
    nom_subproceso:null,
    des_subproceso:null,
    id_proceso:null,
    id_subproceso:null
  }
  constructor(private subProcesoService:SubprocesoService) { 
    this.frameworkComponents = {
      buttonRenderer: ButtonRendererComponent,
      
    };
    this.formSubProceso=this.createFormGroup();
  }
  frameworkComponents: any;
  addorEdit:boolean = false;
  rowDataClicked1:Subproceso;
  isEdit:boolean=false;
  columnDefs = [
    { field: "nom_subproceso", headerName: "Nombre",editable:true },
    { field: "des_subproceso", headerName: "Descripcion" ,editable:true },
    { field: "id_subproceso", hide: true },
    
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
        onClick: this.deleteProceso.bind(this),
        class: "btn btn-outline-danger btn-sm",
        label:'',
        icon:'far fa-trash-alt'
      },
      
    },
  ];
  rowData:any;
  ngOnInit(): void {
    this.getSubProcesos();
  }
  getSubProcesos(){
    
    this.subProcesoService.getSubProcesos(this.proceso.id_proceso).subscribe((data)=>{
      this.rowData=data;
    })
  }
  createFormGroup(){
    return new FormGroup({
      nombre: new FormControl('',[Validators.required]),
      descripcion: new FormControl(''),
      
    });
  }
  agregarProceso() {
    this.isEdit=false;
  }
  editProceso(e) {
    this.isEdit=true;
    this.addorEdit=true;
    this.rowDataClicked1 = e.rowData;
    this.subProceso=this.rowDataClicked1;
  }
  deleteProceso(value) {}
  guardarSubProceso(){
    this.subProceso.id_proceso=this.proceso.id_proceso;
    console.log(this.subProceso);
    if(this.isEdit){
      this.subProcesoService.updateSubProceso(this.subProceso).subscribe((data:any)=>{
        if(data.success){
          this.getSubProcesos();
          showConfirm('Exito',data.message);
          this.addorEdit=false;
        }else{
          showError('Error',data.message);
        }
        
      })
    }else{
      this.subProcesoService.insertSubProceso(this.subProceso).subscribe((data:any)=>{
        if(data.success){
          showConfirm('Exito',data.message);
          this.getSubProcesos();
          this.addorEdit=false;
        }else{
          showError('Error',data.message);
        }
      })
    }
  }
  get nombre() { return this.formSubProceso.get('nombre'); }
  get descripcion() { return this.formSubProceso.get('descripcion'); }
}
