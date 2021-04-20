import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../../../../interfaces/usuario';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioService } from '../../../../services/usuario.service';
import { showConfirm, showError } from 'src/app/functions/alerts';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  @ViewChild("contenido") myModal: ElementRef;
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
  public  formPerfil : FormGroup;
  isEdit=false;
  constructor(private modal:NgbModal,private UsuarioService:UsuarioService) {
    this.formPerfil=this.createFormGroup();
   }

  ngOnInit(): void {
    let infoUser=localStorage.getItem('infoUser');
    this.usuario=JSON.parse(infoUser);
  }
  createFormGroup(){
    return new FormGroup({
      dni: new FormControl('',[Validators.required]),
      nombres: new FormControl('',[Validators.required]),
      apellidop: new FormControl('',[Validators.required]),
      apellidom: new FormControl('',[Validators.required]),
      direccion: new FormControl('',[Validators.required]),
      celular: new FormControl('',[]),
      correo: new FormControl('',[]),
      empresa: new FormControl('',[Validators.required]),
      rol: new FormControl('',[Validators.required]),
      // distrito: new FormControl('',[Validators.required]),
      // direccion: new FormControl('',[Validators.required]),
      // contrasenia: new FormControl('',[Validators.required])
    });
  }
  changePassword(){
    this.modal.open(this.myModal,{size:'sm'})
  }
  get dni() { return this.formPerfil.get('dni'); }
  get nombres() { return this.formPerfil.get('nombres'); }
  get apellidom() { return this.formPerfil.get('apellidom'); }
  get apellidop() { return this.formPerfil.get('apellidop'); }
  get direccion() { return this.formPerfil.get('direccion'); }
  get correo() { return this.formPerfil.get('correo'); }
  get celular() { return this.formPerfil.get('celular'); }
  get empresa() { return this.formPerfil.get('empresa'); }
  get rol() { return this.formPerfil.get('rol'); }
  actualizarData(){
    this.UsuarioService.actualizarData(this.usuario).subscribe((data:any)=>{
      if(data.success){
        showConfirm('Exito',data.message);
        localStorage.setItem('infoUser',JSON.stringify(this.usuario));
      }
    },
    (err)=>{
      showError('Error',err.error.message);
    })
  }
}
