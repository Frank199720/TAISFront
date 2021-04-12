import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../../../../interfaces/usuario';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  @ViewChild("contenido") myModal: ElementRef;
  usuario:Usuario={
    ruc:null,
    direccion:'ALEATORIA',
    nombre:null,
    apellido_materno:null,
    apellido_paterno:null,
    correo:null,
    celular:null,
    username:null,
    password:null,
    rol:null,
    dni:null
  }
  public  formPerfil : FormGroup;
  isEdit=false;
  constructor(private modal:NgbModal) {
    this.formPerfil=this.createFormGroup();
   }

  ngOnInit(): void {
  }
  createFormGroup(){
    return new FormGroup({
      dni: new FormControl('',[Validators.required]),
      nombres: new FormControl('',[Validators.required]),
      apellidos: new FormControl('',[Validators.required]),
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
  get apellidos() { return this.formPerfil.get('apellidos'); }
  get direccion() { return this.formPerfil.get('direccion'); }
  get correo() { return this.formPerfil.get('correo'); }
  get celular() { return this.formPerfil.get('celular'); }
  get empresa() { return this.formPerfil.get('empresa'); }
  get rol() { return this.formPerfil.get('rol'); }
}
