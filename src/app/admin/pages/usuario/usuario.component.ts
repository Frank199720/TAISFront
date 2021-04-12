import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { ButtonRendererComponent } from "../../../rendered/button-renderer.component";
import { ButtonDeleteComponent } from "../../../rendered/button-delete.component";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap'
import { Usuario } from '../../../interfaces/usuario';
import { UsuarioService } from "src/app/services/usuario.service";
import Swal from "sweetalert2";
import { showConfirm, showError } from "src/app/functions/alerts";
@Component({
  selector: "app-usuario",
  templateUrl: "./usuario.component.html",
  styleUrls: ["./usuario.component.scss"],
})
export class UsuarioComponent implements OnInit {
  frameworkComponents: any;
  @ViewChild("contenido") myModal: ElementRef;
  private isEdit:boolean=false;
  usuario:Usuario={
    nombre:null,
    apellido_materno:null,
    apellido_paterno:null,
    username:null,
    password:null,
    ruc:null,
    direccion:null,
    id:null,
    correo:null,
    celular:null,
    rol:null,
    dni:null
  }
  constructor(private modal:NgbModal,private usuarioService:UsuarioService) {
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
        onClick: this.editUser.bind(this),
        class: "btn btn-primary btn-sm",
        icon:"fas fa-edit"
      },
      width:'70px'
    },
    {
      
      cellRenderer: "buttonRenderer",
      cellRendererParams: {
        onClick: this.deleteUser.bind(this),
        class: "btn btn-danger btn-sm",
        icon:"far fa-arrow-alt-circle-down"
      },
      width:'70px'
    },
    {
      
      cellRenderer: "buttonRenderer",
      cellRendererParams: {
        onClick: this.activeUser.bind(this),
        class: "btn btn-success btn-sm",
        icon:"far fa-arrow-alt-circle-up"
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
  editUser(e) {
    this.rowDataClicked1 = e.rowData;
    this.isEdit=true;
    this.usuarioService.getUserByID(2).subscribe((data:Usuario)=>{
      this.usuario=data;
      this.modal.open(this.myModal,{size:'lg'});
    })
    
    this.modal.open(this.myModal,{size:'lg'});
    console.log(this.rowDataClicked1);
  }
  deleteUser(e){
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Este usuario no podrá acceder al sistema",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, de acuerdo'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.inactiveUser(1).subscribe((data:any
          )=>{
          if(data.success){

          }
        })
      }
    })
  }
  activeUser(e){
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Este usuario no podrá acceder al sistema",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, de acuerdo'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.inactiveUser(1).subscribe((data:any
          )=>{
          if(data.success){

          }
        })
      }
    })
  }
  receptUser(user:Usuario){
    console.log(user);
    this.modal.dismissAll();
    if(this.isEdit){
      this.usuarioService.updateUsuario(user,2).subscribe((data:any)=>{
        if(data.success){
          showConfirm('Exito!',data.message);
        }else{
          showError('Error',data.message);
        }
      })
    }else{
      this.usuarioService.insertUsuario(user).subscribe((data:any)=>{
        if(data.success){
          showConfirm('Exito!',data.message);
        }else{
          showError('Error',data.message);
        }
      },
      (error)=>{
        console.log(error);
      })
    }
  }
  agregarUsuario(){
    this.modal.open(this.myModal,{size:'lg'});
  }
}
