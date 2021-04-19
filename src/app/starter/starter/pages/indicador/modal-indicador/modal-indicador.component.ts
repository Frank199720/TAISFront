import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { showError } from 'src/app/functions/alerts';
import { Indicador } from '../../../../../interfaces/indicador';
import { Subproceso } from '../../../../../interfaces/subproceso';
import { SubprocesoService } from '../../../../../services/subproceso.service';

@Component({
  selector: 'app-modal-indicador',
  templateUrl: './modal-indicador.component.html',
  styleUrls: ['./modal-indicador.component.scss']
})
export class ModalIndicadorComponent implements OnInit {
  @Input() indicador:Indicador;
  @Output() indicadorOut: EventEmitter<Indicador>=new EventEmitter();
  listaSubProceso:Subproceso[];
  public  formIndicador : FormGroup;
  
  constructor(private SubprocesoService:SubprocesoService) { }

  ngOnInit(): void {
    this.formIndicador=this.createFormGroup();
    this.SubprocesoService.getSubProcesos(this.indicador.id_proceso).subscribe((data:Subproceso[])=>{
      this.listaSubProceso=data;
    })
  }
  sendIndicador(){
    
    this.formIndicador.markAllAsTouched();
    if (!this.formIndicador.invalid) {
      this.indicadorOut.emit(this.indicador);
    } else {
      
      showError("Error", "Complete los campos");
    }
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
