import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ButtonRendererComponent } from "src/app/rendered/button-renderer.component";
import { Company } from '../../../interfaces/company';
import { EmpresaService } from '../../../services/empresa.service';
import { showConfirm,showError } from 'src/app/functions/alerts';
import Swal from "sweetalert2";


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
    this.empresa.ruc_empresa=null;
    this.empresa.emp_tipocontribuyente=null;
    this.empresa.emp_gironegocio=null;
    this.empresa.emp_direccion=null;
    this.empresa.emp_email=null;
    this.empresa.emp_telefono=null;
    this.empresa.emp_nombrec=null;
    this.empresa.emp_estado=null;
    
    this.modal.open(this.myModal);
  }
  editCompany(e) {
    let ruc_empresa= e.rowData.ruc_empresa;
    let estado=e.rowData.emp_estado;
    if(estado==0){
      showError('Error','La empresa ha sido desactivada');
    }else{
      this.isEdit=true;
      this.EmpresaService.getEmpresaByID(ruc_empresa).subscribe((data:Company)=>{
        this.empresa=data[0];
        
        this.modal.open(this.myModal,{size:'lg'});
      })
    }
    
  }
  deleteCompany(e) {
    let ruc_empresa= e.rowData.ruc_empresa;
    Swal.fire({
      title: '¿Estás seguro?',
      text: "La empresa quedará inactivada.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, de acuerdo'
    }).then((result) => {
      if (result.isConfirmed) {
        this.EmpresaService.deleteEmpresa(ruc_empresa).subscribe((data:any
          )=>{
            console.log(data);
            if(data.success){
              this.getEmpresas();
              showConfirm('Exito',data.message);
            }else{
              showConfirm('Error',data.message);
            }
        })
      }
    })
  }
  activeCompany() {}
  receptCompany(empresa_recep:Company){
    console.log('x');
    
    if(this.isEdit){
      this.EmpresaService.updateEmpresa(empresa_recep,empresa_recep.ruc_empresa).subscribe((data:any)=>{
        if(data.success){
          this.getEmpresas();
          showConfirm('Exito',data.message);
          this.modal.dismissAll();
        }else{
          showError('Error',data.message);
        }
      })
    }else{
      this.EmpresaService.insertEmpresa(empresa_recep).subscribe((data:any)=>{
        console.log(data);
        if(data.success){
          this.getEmpresas();
          showConfirm('Exito',data.message);
          this.modal.dismissAll();
          
        }else{
          showError('Error',data.message);
        }
      })
    }
  }
}
