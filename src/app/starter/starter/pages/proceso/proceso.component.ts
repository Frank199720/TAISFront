import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ButtonRendererComponent } from "src/app/rendered/button-renderer.component";

@Component({
  selector: "app-proceso",
  templateUrl: "./proceso.component.html",
  styleUrls: ["./proceso.component.scss"],
})
export class ProcesoComponent implements OnInit {
  constructor() {
    this.frameworkComponents = {
      buttonRenderer: ButtonRendererComponent,
      
    };
  }

  ngOnInit(): void {}
  frameworkComponents: any;
  @ViewChild("contenido") myModalSubProceso: ElementRef;
  rowDataClicked1 = {};
  columnDefs = [
    { field: "make", headerName: "Nombre" },
    { field: "model", headerName: "Descripcion" },
    { field: "price", headerName: "Fecha de Registro" },
    
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
  agregarProceso() {}
  editProceso(value) {}
  deleteProceso(value) {}
}
