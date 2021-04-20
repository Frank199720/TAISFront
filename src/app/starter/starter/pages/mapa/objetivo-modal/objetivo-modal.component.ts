import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ButtonRendererComponent } from 'src/app/rendered/button-renderer.component';
import { Perspectiva } from '../../../../../interfaces/perspectiva';
import { Objetivo } from '../../../../../interfaces/objetivo';
import { PerspectivaService } from '../../../../../services/perspectiva.service';
import { ObjetivoService } from '../../../../../services/objetivo.service';
import { showConfirm } from 'src/app/functions/alerts';

@Component({
  selector: 'app-objetivo-modal',
  templateUrl: './objetivo-modal.component.html',
  styleUrls: ['./objetivo-modal.component.scss']
})
export class ObjetivoModalComponent implements OnInit {
  public  formObjetivo : FormGroup;
  @Input() idMapa:number;
  frameworkComponents: any;
  objetivo:Objetivo={
    nom_objetivo:null,
    id_perspectiva:null
  }
  listaPerspectiva:Perspectiva[];
  constructor(private PerspectivaService:PerspectivaService,private ObjetivoService:ObjetivoService) { 
    this.frameworkComponents = {
      buttonRenderer: ButtonRendererComponent,
      
    };
    
  }
  columnDefs = [
    { field: "id_objetivo", headerName: "ID",hide:true},
    { field: "nom_objetivo", headerName: "Descripcion" },
    { field: "nom_perspectiva", headerName: "Perspectiva" ,editable:true },
    
    
    {
      cellRenderer: "buttonRenderer",
      cellRendererParams: {
        onClick: this.editObjetivo.bind(this),
        class: "btn btn-primary btn-sm",
        icon: "fas fa-edit",
      },
      width: "70px",
    },
    {
      cellRenderer: "buttonRenderer",
      cellRendererParams: {
        onClick: this.deleteObjetivo.bind(this),
        class: "btn btn-outline-danger btn-sm",
        label:'',
        icon:'far fa-trash-alt'
      },
      
    },
  ];
  rowData:any;

  ngOnInit(): void {
    this.formObjetivo=this.createFormGroup();
    this.PerspectivaService.getPerspectivas(this.idMapa).subscribe((data:Perspectiva[])=>{
      this.listaPerspectiva=data;
      console.log(data);
    })
  }
  editObjetivo(){

  }
  deleteObjetivo(){
    
  }
  createFormGroup(){
    return new FormGroup({
      descripcion: new FormControl('',[Validators.required]),
      perspectiva: new FormControl('',[Validators.required]),
      
    });
  }
  addObjetivo(){

  }
  guardarObjetivo(){
    this.formObjetivo.markAllAsTouched();
    if(!this.formObjetivo.invalid){
      
      this.ObjetivoService.insertObjetivo(this.objetivo).subscribe((data:any)=>{
        if(data.success){
          this.actualizarData();
          showConfirm('Exito',data.message);  
        }
      })
    }
  }
  actualizarData(){
    this.ObjetivoService.getObjetivos(this.objetivo.id_perspectiva).subscribe((data)=>{
      this.rowData=data;
    })
  }
  get descripcion() { return this.formObjetivo.get('descripcion'); }
  get perspectiva() { return this.formObjetivo.get('perspectiva'); }
}
