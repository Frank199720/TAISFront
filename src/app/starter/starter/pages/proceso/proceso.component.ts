import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Proceso } from "src/app/interfaces/proceso";
import { ButtonRendererComponent } from "src/app/rendered/button-renderer.component";

@Component({
  selector: "app-proceso",
  templateUrl: "./proceso.component.html",
  styleUrls: ["./proceso.component.scss"],
})
export class ProcesoComponent implements OnInit {
  public  formProceso : FormGroup;
  proceso:Proceso={
    nombre:null,
    descripcion:null
  }
  constructor() {
    this.frameworkComponents = {
      buttonRenderer: ButtonRendererComponent,
      
    };
    this.formProceso=this.createFormGroup();
  }

  ngOnInit(): void {}
  frameworkComponents: any;
  addorEdit:boolean = false;
  @ViewChild("contenido") myModalSubProceso: ElementRef;
  rowDataClicked1 = {};
  columnDefs = [
    { field: "make", headerName: "Nombre",editable:true },
    { field: "model", headerName: "Descripcion" ,editable:true },
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
  createFormGroup(){
    return new FormGroup({
      nombre: new FormControl('',[Validators.required]),
      descripcion: new FormControl(''),
      
    });
  }
  get nombre() { return this.formProceso.get('nombre'); }
  get descripcion() { return this.formProceso.get('descripcion'); }
}
