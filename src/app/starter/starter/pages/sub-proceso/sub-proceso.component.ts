import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subproceso } from 'src/app/interfaces/subproceso';
import { ButtonRendererComponent } from 'src/app/rendered/button-renderer.component';

@Component({
  selector: 'app-sub-proceso',
  templateUrl: './sub-proceso.component.html',
  styleUrls: ['./sub-proceso.component.scss']
})
export class SubProcesoComponent implements OnInit {
  public  formSubProceso : FormGroup;
  subProceso:Subproceso={
    nombre:null,
    descripcion:null
  }
  constructor() { 
    this.frameworkComponents = {
      buttonRenderer: ButtonRendererComponent,
      
    };
    this.formSubProceso=this.createFormGroup();
  }
  frameworkComponents: any;
  addorEdit:boolean = false;
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
        class: "btn btn-outline-success btn-sm",
        label:'Subprocesos'
      },
      
    },
  ];
  rowData = [
    { make: "Toyota", model: "Celica", price: 35000 },
    { make: "Ford", model: "Mondeo", price: 32000 },
    { make: "Porsche", model: "Boxter", price: 72000 },
  ];
  ngOnInit(): void {
  }
  createFormGroup(){
    return new FormGroup({
      nombre: new FormControl('',[Validators.required]),
      descripcion: new FormControl(''),
      
    });
  }
  agregarProceso() {}
  editProceso(value) {}
  deleteProceso(value) {}
  get nombre() { return this.formSubProceso.get('nombre'); }
  get descripcion() { return this.formSubProceso.get('descripcion'); }
}
