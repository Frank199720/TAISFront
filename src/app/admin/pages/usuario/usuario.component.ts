import { Component, OnInit } from "@angular/core";
import { ButtonRendererComponent } from "../../../rendered/button-renderer.component";
import { ButtonDeleteComponent } from "../../../rendered/button-delete.component";

@Component({
  selector: "app-usuario",
  templateUrl: "./usuario.component.html",
  styleUrls: ["./usuario.component.scss"],
})
export class UsuarioComponent implements OnInit {
  frameworkComponents: any;
  constructor() {
    this.frameworkComponents = {
      buttonRenderer: ButtonRendererComponent,
      buttonRenderer2: ButtonDeleteComponent,
    };
  }
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
        onClick: this.onBtnClick1.bind(this),
        label: "Editar",
      },
      width:'70px'
    },
    {
      
      cellRenderer: "buttonRenderer2",
      cellRendererParams: {
        onClick: this.onBtnClick1.bind(this),
        label: "Eliminar",
      },
      width:'70px'
    },
  ];

  rowData = [
    { make: "Toyota", model: "Celica", price: 35000 },
    { make: "Ford", model: "Mondeo", price: 32000 },
    { make: "Porsche", model: "Boxter", price: 72000 },
  ];
  ngOnInit(): void {}
  open(value) {
    console.log(value);
  }
  onBtnClick1(e) {
    this.rowDataClicked1 = e.rowData;
    console.log(this.rowDataClicked1);
  }
}