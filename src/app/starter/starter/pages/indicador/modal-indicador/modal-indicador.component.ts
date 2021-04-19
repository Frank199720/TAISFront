import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Indicador } from '../../../../../interfaces/indicador';

@Component({
  selector: 'app-modal-indicador',
  templateUrl: './modal-indicador.component.html',
  styleUrls: ['./modal-indicador.component.scss']
})
export class ModalIndicadorComponent implements OnInit {
  @Input() idproceso:number;
  @Output() empresaout: EventEmitter<Indicador>=new EventEmitter();
  public  formIndicador : FormGroup;
  indicador:Indicador={
    id_subproceso:null,
    preg_cinco:null,
    preg_uno:null,
    preg_cuatro:null,
    preg_dos:null,
    preg_tres:null,
    formula:null,
    nom_indicador:null
  }
  constructor() { }

  ngOnInit(): void {
  }
  sendIndicador(){
    
  }
  createFormGroup(){
    return new FormGroup({
      nombre: new FormControl('',[Validators.required]),
      medicion: new FormControl('',[Validators.required]),
      responsable: new FormControl('',[Validators.required]),
      mecanismo: new FormControl('',[Validators.required]),
      tolerancia: new FormControl('',[Validators.required]),
      resultado: new FormControl('',[Validators.required]),
      subp: new FormControl('',[Validators.required]),
      formula: new FormControl('',[Validators.required]),
      
      // distrito: new FormControl('',[Validators.required]),
      // direccion: new FormControl('',[Validators.required]),
      // contrasenia: new FormControl('',[Validators.required])
    });
  }
  get nombre() { return this.formIndicador.get('nombre'); }
  get medicion() { return this.formIndicador.get('medicion'); }
  get responsable() { return this.formIndicador.get('responsable'); }
  get mecanismo() { return this.formIndicador.get('mecanismo'); }
  get formula() { return this.formIndicador.get('formula'); }
  get resultado() { return this.formIndicador.get('resultado'); }
  get subp() { return this.formIndicador.get('subp'); }
  get tolerancia() { return this.formIndicador.get('tolerancia'); }
}
