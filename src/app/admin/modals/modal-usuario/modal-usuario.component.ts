import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Usuario } from 'src/app/interfaces/usuario';

@Component({
  selector: 'app-modal-usuario',
  templateUrl: './modal-usuario.component.html',
  styleUrls: ['./modal-usuario.component.scss']
})
export class ModalUsuarioComponent implements OnInit {

  constructor() { } 
  @Input() usuario:Usuario;
  @Output() userOut: EventEmitter<Usuario>=new EventEmitter();
  ngOnInit(): void {
    console.log(this.usuario);
  }
  sendUser(){
    console.log(this.usuario)
    this.userOut.emit(this.usuario);
  }
}
