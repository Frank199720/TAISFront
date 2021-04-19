import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ButtonRendererComponent } from 'src/app/rendered/button-renderer.component';

@Component({
  selector: 'app-indicador',
  templateUrl: './indicador.component.html',
  styleUrls: ['./indicador.component.scss']
})
export class IndicadorComponent implements OnInit {
   
  constructor(private modal:NgbModal) {
    this.frameworkComponents = {
      buttonRenderer: ButtonRendererComponent,
      
    };
    
  }
  ngOnInit(): void {}
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
        onClick: this.viewSub.bind(this),
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
  viewSub(value) {
    //this.modal.open(this.myModalSubProceso,{ size: 'xl' ,backdrop:false });
  }
  

}
