import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ButtonRendererComponent } from "src/app/rendered/button-renderer.component";
import { Company } from '../../../interfaces/company';
import { EmpresaService } from '../../../services/empresa.service';
import { showConfirm,showError } from 'src/app/functions/alerts';


@Component({
  selector: "app-empresa",
  templateUrl: "./empresa.component.html",
  styleUrls: ["./empresa.component.scss"],
})
export class EmpresaComponent implements OnInit {
  empresa:Company={
    ruc_empresa:null,
    emp_tipocontribuyente:null,
    emp_gironegocio:null,
    emp_direccion:null,
    emp_email:null,
    emp_telefono:null,
    emp_nombrec:null,
    emp_estado:null
  };
  isEdit:boolean=false;
  frameworkComponents: any;
  @ViewChild("contenido") myModal: ElementRef;
  rowDataClicked1 = {};
  columnDefs = [
    { field: "ruc_empresa", headerName: "RUC" },
    { field: "emp_nombrec", headerName: "Razón Social" },
    { field: "emp_direccion", headerName: "Dirección" },
    { field: "emp_telefono", headerName: "Teléfono" },
    { field: "fecha_creacion", headerName: "Fecha de Registro" },
    {
      field: "emp_estado",
      headerName: "Estado",
      cellRenderer: (params) => {
        return `<span ${
          params.value == 0
            ? 'class="badge badge-pill badge-danger">Inactivo'
            : 'class="badge badge-pill badge-success">Activo'
        }</span>`;
      },
    },
    {
      cellRenderer: "buttonRenderer",
      cellRendererParams: {
        onClick: this.editCompany.bind(this),
        class: "btn btn-primary btn-sm",
        icon: "fas fa-edit",
      },
      width: "70px",
    },
    {
      cellRenderer: "buttonRenderer",
      cellRendererParams: {
        onClick: this.deleteCompany.bind(this),
        class: "btn btn-danger btn-sm",
        icon: "far fa-arrow-alt-circle-down",
      },
      width: "70px",
    },
    {
      cellRenderer: "buttonRenderer",
      cellRendererParams: {
        onClick: this.activeCompany.bind(this),
        class: "btn btn-success btn-sm",
        icon: "far fa-arrow-alt-circle-up",
      },
      width: "70px",
    },
  ];

  rowData :any;
  constructor(private modal:NgbModal,private EmpresaService:EmpresaService) {
    this.frameworkComponents = {
      buttonRenderer: ButtonRendererComponent
     
    };
    
  }
  getEmpresas(){
    this.EmpresaService.getEmpresas().subscribe((data:any)=>{
      this.rowData=data;
    })
  }
  ngOnInit(): void {
    this.getEmpresas();
  }
  agregarEmpresa() {
    this.modal.open(this.myModal);
  }
  editCompany() {}
  deleteCompany() {}
  activeCompany() {}
  receptCompany(empresa_recep:Company){
    console.log('x');
    if(this.isEdit){

    }else{
      this.EmpresaService.insertEmpresa(empresa_recep).subscribe((data:any)=>{
        console.log(data);
        if(data.success){
          this.getEmpresas();
          showConfirm('Exito',data.message);
          this.modal.dismissAll();
          
        }else{
          showError('Fracaso',data.message);
        }
      })
    }
  }
}
