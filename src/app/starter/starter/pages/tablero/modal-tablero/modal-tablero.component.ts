import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { showError, showConfirm } from 'src/app/functions/alerts';
import { Tablero } from 'src/app/interfaces/tablero';
import { ButtonRendererComponent } from 'src/app/rendered/button-renderer.component';
import { Indicador } from '../../../../../interfaces/indicador';
import { Iniciativa } from '../../../../../interfaces/iniciativa';
import { IndicadorService } from '../../../../../services/indicador.service';
import { TableroService } from '../../../../../services/tablero.service';

@Component({
  selector: 'app-modal-tablero',
  templateUrl: './modal-tablero.component.html',
  styleUrls: ['./modal-tablero.component.scss']
})
export class ModalTableroComponent implements OnInit {
  @Input() tablero:Tablero;
  @Output() tableroOut: EventEmitter<Tablero>=new EventEmitter();
  constructor(private indicadorService:IndicadorService,private tableroService:TableroService) { 
    this.frameworkComponents = {
      buttonRenderer: ButtonRendererComponent,
      
    };
  }
  listaIndicador:Indicador[];
  frameworkComponents: any;
  rowData:any;
  idTablero:string;
  isEdit:boolean=false;
  columnDefs = [
    
    { field: "des_iniciativa", headerName: "Descripcion"},
    { field: "id_iniciativa", hide: true },
    
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
  ruc:string;
  
  iniciativa:Iniciativa={
    des_iniciativa:null,
    id_tablero:null,
    id_iniciativa:null
  }
  public  formTablero : FormGroup;
  ngOnInit(): void {
    this.formTablero=this.createFormGroup();
    let jsonParse= JSON.parse(localStorage.getItem('infoUser'));
    this.ruc=jsonParse.ruc_empresa;
    this.getIndicadores();
    console.log(this.tablero);
    if(this.tablero.id_tablero!=null){
      console.log(this.tablero);
      console.log('dsa');
      this.getIniciativas();
    }else{
      this.tableroService.getCantidadDeRegistros().subscribe((data:any)=>{
        console.log(data[0].cantidad);
        this.idTablero='T'+data[0].cantidad;
        this.tablero.id_tablero=this.idTablero;
        console.log(this.tablero);
      })
    }
   
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
    if(this.tablero.continue){
      this.iniciativa.id_tablero=this.tablero.id_tablero;
      console.log(this.iniciativa);
      if(this.isEdit){
        this.tableroService.updateIniciativa(this.iniciativa).subscribe((data:any)=>{
          if(data.success){
            this.getIniciativas();
            this.isEdit=false;
            this.reseteIniciativa();
            showConfirm('Exito',data.message);
            
          }
        })
      }else{
        this.tableroService.insertIniciativa(this.iniciativa).subscribe((data:any)=>{
          if(data.success){
            this.getIniciativas();
            this.reseteIniciativa();
            showConfirm('Exito',data.message);
          }
      })
      }
      
    }else{
      showError('Error','Primero guarde el tablero');
    }
  }
  reseteIniciativa(){
    this.iniciativa.id_tablero=null;
    this.iniciativa.id_iniciativa=null;
    this.iniciativa.des_iniciativa=null;
  }
  getIniciativas(){
    this.tableroService.getIniciativa(this.tablero.id_tablero).subscribe((data:any)=>{
      this.rowData=data;
    })
  }
  editIniciativa(e){
    this.iniciativa= e.rowData;
    this.isEdit=true;
  }
  deleteIniciativa(){

  }
  sendTablero(){
    
    this.formTablero.markAllAsTouched();
    if (!this.formTablero.invalid) {
      this.tableroOut.emit(this.tablero);
    } else {
      
      showError("Error", "Complete los campos");
    }
  }
  getIndicadores(){
    this.indicadorService.getIndicadores(this.ruc).subscribe((data:Indicador[])=>{
      this.listaIndicador=data;
    })
  }
}
