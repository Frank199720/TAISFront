import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Tablero } from 'src/app/interfaces/tablero';
import { ButtonRendererComponent } from 'src/app/rendered/button-renderer.component';
import { Indicador } from '../../../../../interfaces/indicador';
import { Iniciativa } from '../../../../../interfaces/iniciativa';

@Component({
  selector: 'app-modal-tablero',
  templateUrl: './modal-tablero.component.html',
  styleUrls: ['./modal-tablero.component.scss']
})
export class ModalTableroComponent implements OnInit {

  constructor() { 
    this.frameworkComponents = {
      buttonRenderer: ButtonRendererComponent,
      
    };
  }
  listaIndicador:Indicador[];
  frameworkComponents: any;
  rowData:any;
  columnDefs = [
    { field: "nom_subproceso", headerName: "Nombre",editable:true },
    { field: "des_subproceso", headerName: "Descripcion" ,editable:true },
    { field: "id_subproceso", hide: true },
    
    {
      cellRenderer: "buttonRenderer",
      cellRendererParams: {
        onClick: this.editIniciativa.bind(this),
        class: "btn btn-primary btn-sm",
        icon: "fas fa-edit",
      },
      width: "70px",
    },
    {
      cellRenderer: "buttonRenderer",
      cellRendererParams: {
        onClick: this.deleteIniciativa.bind(this),
        class: "btn btn-outline-danger btn-sm",
        label:'',
        icon:'far fa-trash-alt'
      },
      
    },
  ];

  tablero:Tablero={
    id_tablero:null,
    nom_responsable:null,
    nom_tablero:null,
    objetivo:null,
    sem_ambar:null,
    sem_rojo:null,
    sem_verde:null,
    id_indicador:null,
    responsable:null
  }
  iniciativa:Iniciativa={
    des_iniciativa:null,
    id_tablero:null
  }
  public  formTablero : FormGroup;
  ngOnInit(): void {
    this.formTablero=this.createFormGroup();
  }
  createFormGroup(){
    return new FormGroup({
      indicador: new FormControl('',[Validators.required]),
      nombre: new FormControl('',[Validators.required]),
      responsable: new FormControl('',[Validators.required]),
      meta: new FormControl('',[Validators.required]),
      objetivo: new FormControl('',[Validators.required]),
      rojo: new FormControl('',[Validators.required]),
      ambar: new FormControl('',[Validators.required]),
      verde: new FormControl('',[Validators.required]),
      
      // distrito: new FormControl('',[Validators.required]),
      // direccion: new FormControl('',[Validators.required]),
      // contrasenia: new FormControl('',[Validators.required])
    });
  }
  get indicador() { return this.formTablero.get('indicador'); }
  get nombre() { return this.formTablero.get('nombre'); }
  get responsable() { return this.formTablero.get('responsable'); }
  get meta() { return this.formTablero.get('meta'); }
  get objetivo() { return this.formTablero.get('objetivo'); }
  get rojo() { return this.formTablero.get('rojo'); }
  get ambar() { return this.formTablero.get('ambar'); }
  get verde() { return this.formTablero.get('verde'); }
  
  agregarIniciativa(){

  }
  editIniciativa(){

  }
  deleteIniciativa(){

  }
  sendTablero(){

  }
}
