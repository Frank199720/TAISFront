import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ButtonRendererComponent } from "src/app/rendered/button-renderer.component";
import { Company } from '../../../interfaces/company';

@Component({
  selector: "app-empresa",
  templateUrl: "./empresa.component.html",
  styleUrls: ["./empresa.component.scss"],
})
export class EmpresaComponent implements OnInit {
  empresa:Company={
    ruc:null,
    contribuyente:null,
    gironegocio:null,
    direccion:null,
    email:null,
    telefono:null,
    nombrec:null
  };
  frameworkComponents: any;
  @ViewChild("contenido") myModal: ElementRef;
  rowDataClicked1 = {};
  columnDefs = [
    { field: "make", headerName: "Nombre" },
    { field: "model", headerName: "Rol" },
    { field: "price", headerName: "Fecha de Registro" },
    {
      field: "model",
      headerName: "Estado",
      cellRenderer: (params) => {
        return `<span ${
          params.value == "Celica"
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

  rowData = [
    { make: "Toyota", model: "Celica", price: 35000 },
    { make: "Ford", model: "Mondeo", price: 32000 },
    { make: "Porsche", model: "Boxter", price: 72000 },
  ];
  constructor(private modal:NgbModal) {
    this.frameworkComponents = {
      buttonRenderer: ButtonRendererComponent
     
    };
  }

  ngOnInit(): void {}
  agregarEmpresa() {
    this.modal.open(this.myModal);
  }
  editCompany() {}
  deleteCompany() {}
  activeCompany() {}
  receptCompany(){

  }
}
