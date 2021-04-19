import { Component, OnInit } from '@angular/core';
import { ButtonRendererComponent } from 'src/app/rendered/button-renderer.component';

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.scss']
})
export class TableroComponent implements OnInit {
  isEdit:boolean=false;
  frameworkComponents: any;
  addorEdit:boolean = false;
  
  rowDataClicked1 = {};
  rowData:any;
  columnDefs = [
    { field: "nom_indicador", headerName: "Nombre"},
    { field: "preg_tres", headerName: "Encargado"},
    { field: "nom_proceso", headerName: "Proceso" },
    { field: "nom_subproceso", headerName: "SubProceso" },
    
    {
      cellRenderer: "buttonRenderer",
      cellRendererParams: {
        onClick: this.editTablero.bind(this),
        class: "btn btn-primary btn-sm",
        icon: "fas fa-edit",
      },
      width: "70px",
    },
    {
      cellRenderer: "buttonRenderer",
      cellRendererParams: {
        onClick: this.generarVista.bind(this),
        class: "btn btn-warning btn-sm",
        label:'',
        icon : 'fas fa-eye'
      },
      
    },
  ];
  
  constructor() {
    this.frameworkComponents = {
      buttonRenderer: ButtonRendererComponent,
      
    };
   }

  ngOnInit(): void {
  }
  receptTablero(){

  }
  agregarTablero(){

  }
  generarVista(){

  }
  editTablero(){

  }
}
