import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { showError } from 'src/app/functions/alerts';
import { Company } from '../../../interfaces/company';
import { EmpresaService } from '../../../services/empresa.service';

@Component({
  selector: 'app-modal-empresa',
  templateUrl: './modal-empresa.component.html',
  styleUrls: ['./modal-empresa.component.scss']
})
export class ModalEmpresaComponent implements OnInit {
  @Input() empresa:Company;
  @Output() empresaout: EventEmitter<Company>=new EventEmitter();
  public  formEmpresa : FormGroup;
  
  constructor(private EmpresaService:EmpresaService ) { 
    
  }
  
  ngOnInit(): void {
    this.formEmpresa=this.createFormGroup();
    
  }
  createFormGroup(){
    return new FormGroup({
      ruc: new FormControl('',[Validators.required]),
      razonSocial: new FormControl('',[Validators.required]),
      giro: new FormControl('',[Validators.required]),
      contribuyente: new FormControl('',[Validators.required]),
      direccion: new FormControl('',[]),
      correo: new FormControl('',[]),
      telefono: new FormControl('',[Validators.required]),
      
      // distrito: new FormControl('',[Validators.required]),
      // direccion: new FormControl('',[Validators.required]),
      // contrasenia: new FormControl('',[Validators.required])
    });
  }
  get ruc() { return this.formEmpresa.get('ruc'); }
  get razonSocial() { return this.formEmpresa.get('razonSocial'); }
  get giro() { return this.formEmpresa.get('giro'); }
  get contribuyente() { return this.formEmpresa.get('contribuyente'); }
  get direccion() { return this.formEmpresa.get('direccion'); }
  get telefono() { return this.formEmpresa.get('telefono'); }

  get correo() { return this.formEmpresa.get('correo'); }
  sendCompany(){
       
    
    this.formEmpresa.markAllAsTouched;
    if(!this.formEmpresa.invalid){
      console.log('xd')
      this.empresaout.emit(this.empresa);
    }else{
      
      showError('Error','Complete los campos');
    }
    
  }
}
