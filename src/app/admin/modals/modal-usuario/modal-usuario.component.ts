import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/interfaces/usuario';

@Component({
  selector: 'app-modal-usuario',
  templateUrl: './modal-usuario.component.html',
  styleUrls: ['./modal-usuario.component.scss']
})
export class ModalUsuarioComponent implements OnInit {
  @Input() usuario:Usuario;
  @Output() userOut: EventEmitter<Usuario>=new EventEmitter();
  public  formUsuario : FormGroup;
  constructor(private formBuilder: FormBuilder,) { 
    this.formUsuario = this.formBuilder.group({
      dni: ['', Validators.required],
      
    });
  } 
  
  ngOnInit(): void {
    console.log(this.usuario);
  }
  sendUser(){
    console.log(this.usuario)
    this.userOut.emit(this.usuario);
  }
}
