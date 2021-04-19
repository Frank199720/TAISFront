import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Proceso } from "src/app/interfaces/proceso";
import { ButtonRendererComponent } from "src/app/rendered/button-renderer.component";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProcesoService } from "src/app/services/proceso.service";
import { showConfirm, showError } from "src/app/functions/alerts";

@Component({
  selector: "app-proceso",
  templateUrl: "./proceso.component.html",
  styleUrls: ["./proceso.component.scss"],
})
export class ProcesoComponent implements OnInit {
  public  formProceso : FormGroup;
  proceso:Proceso={
    des_proceso:null,
    ruc_empresa:null,
    id_proceso:null,
    nom_proceso:null
  }
  ruc:string;
  constructor(private modal:NgbModal,private procesoService:ProcesoService) {
    this.frameworkComponents = {
      buttonRenderer: ButtonRendererComponent,
      
    };
    this.formProceso=this.createFormGroup();
  }

  ngOnInit(): void {
    let jsonParse= JSON.parse(localStorage.getItem('infoUser'));
    this.ruc=jsonParse.ruc_empresa;
    this.proceso.ruc_empresa=this.ruc;
    this.getProcesos();
  }
  getProcesos(){
    this.procesoService.getProcesos(this.ruc).subscribe((data:any)=>{
      this.rowData=data;
    })
  }
  frameworkComponents: any;
  addorEdit:boolean = false;
  isEdit:boolean=false;
  @ViewChild("contenido") myModalSubProceso: ElementRef;
  rowDataClicked1:Proceso;
  columnDefs = [
    { field: "nom_proceso", headerName: "Nombre",editable:true },
    { field: "des_proceso", headerName: "Descripcion" ,editable:true },
    { field: "id_proceso", headerName: "Estado",hide:true },
    
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

  rowData :any
  agregarProceso() {
    this.isEdit=false;
  }
  guardarProceso(){
    if(this.isEdit){
      this.procesoService.editSubproceso(this.proceso).subscribe((data:any)=>{
        if(data.success){
          this.getProcesos();
          showConfirm('Exito',data.message);
          
          this.addorEdit=false;
        }else{
          showError('Error',data.message);
        
        }
      })
    }else{
      this.procesoService.guardarProceso(this.proceso).subscribe((data:any)=>{
        if(data.success){
          this.getProcesos();
          showConfirm('Exito',data.message);
          
          this.addorEdit=false;
        }else{
          showError('Error',data.message);
          
        }
      })
    }
    
  }
  editProceso(e) {
    this.rowDataClicked1 = e.rowData;
    let id= e.rowData.id_proceso;
    this.procesoService.getProcesoByID(id).subscribe((data:Proceso)=>{
      this.addorEdit=true;
    this.isEdit=true;
    
      this.proceso=data;
      console.log(data);
    })
  }
  viewSub(e) {
    this.rowDataClicked1 = e.rowData;
    this.proceso=this.rowDataClicked1;
    this.modal.open(this.myModalSubProceso,{ size: 'xl' ,backdrop:false });
  }
  createFormGroup(){
    return new FormGroup({
      nombre: new FormControl('',[Validators.required]),
      descripcion: new FormControl(''),
      
    });
  }
  get nombre() { return this.formProceso.get('nombre'); }
  get descripcion() { return this.formProceso.get('descripcion'); }
}
