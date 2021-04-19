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
    usu_nombre:null,
    usu_apellidom:null,
    usu_apellidop:null,
    username:null,
    password:null,
    ruc_empresa:null,
    usu_direccion:null,
    id:null,
    usu_telefono:null,
    id_rol:null,
    usu_dni:null
  }
  constructor(private modal:NgbModal,private usuarioService:UsuarioService) {
    this.frameworkComponents = {
      buttonRenderer: ButtonRendererComponent,
      buttonRenderer2: ButtonDeleteComponent,
    };
    
  }
  rowDataClicked1 = {};
  columnDefs = [
    { field: "usu_nombre", headerName: "Nombre" },
    { field: "usu_apellidop", headerName: "A. Paterno" },
    { field: "usu_apellidom", headerName: "A. Materno" },
    { field: "username", headerName: "Usuario" },
    { field: "fecha_creacion", headerName: "Fecha de Registro" },
    { field: 'id',headerName:'id',hide:true},
    {
      field: "usu_estado",
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
 
  rowData :any
  ngOnInit(): void {
    this.getUsers();
  }
  getUsers(){
    this.usuarioService.getUsers().subscribe((data:any)=>{
      this.rowData=data;
    },
    (err)=>{
      console.log(err);
    })
  }
  open(value) {
    console.log(value);
  }
  editUser(e) {
    this.rowDataClicked1 = e.rowData;
    let id= e.rowData.id;
    this.isEdit=true;
    this.usuarioService.getUserByID(id).subscribe((data:Usuario)=>{
      this.usuario=data[0];
      console.log(this.usuario);
      this.modal.open(this.myModal,{size:'lg'});
    })
    
   
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
              this.getUsers();
              showConfirm('Exito',data.message);
            }else{
              showConfirm('Error',data.message);
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
            this.getUsers();
            showConfirm('Exito',data.message);
          }else{
            showConfirm('Error',data.message);
          }
        })
      }
    })
  }
  receptUser(user:Usuario){
    console.log(user);
    this.modal.dismissAll();
    if(this.isEdit){
      this.usuarioService.updateUsuario(user,user.id).subscribe((data:any)=>{
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
    this.isEdit=false;
    this.modal.open(this.myModal,{size:'lg'});
  }
}
