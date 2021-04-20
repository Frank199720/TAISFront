import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { showConfirm } from 'src/app/functions/alerts';
import { ButtonRendererComponent } from 'src/app/rendered/button-renderer.component';
import { Perspectiva } from '../../../../../interfaces/perspectiva';
import { PerspectivaService } from '../../../../../services/perspectiva.service';

@Component({
  selector: 'app-perspectiva-modal',
  templateUrl: './perspectiva-modal.component.html',
  styleUrls: ['./perspectiva-modal.component.scss']
})
export class PerspectivaModalComponent implements OnInit {
  public  formPerspectiva : FormGroup;
  @Input() idMapa:number;
  perspectiva:Perspectiva={
    nom_perspectiva:null,
    id_mapa:null
  }
  frameworkComponents: any;
  constructor(private PerspectivaService:PerspectivaService) { 
    this.frameworkComponents = {
      buttonRenderer: ButtonRendererComponent,
      
    };
  }
  columnDefs = [
    { field: "id_perspectiva", headerName: "ID",hide:true},
    { field: "nom_perspectiva", headerName: "Descripcion" ,editable:true },
    
    
    {
      cellRenderer: "buttonRenderer",
      cellRendererParams: {
        onClick: this.editPerspectiva.bind(this),
        class: "btn btn-primary btn-sm",
        icon: "fas fa-edit",
      },
      width: "70px",
    },
    {
      cellRenderer: "buttonRenderer",
      cellRendererParams: {
        onClick: this.deletePerspectiva.bind(this),
        class: "btn btn-outline-danger btn-sm",
        label:'',
        icon:'far fa-trash-alt'
      },
      
    },
  ];
  rowData:any;
  ngOnInit(): void {
    this.formPerspectiva=this.createFormGroup();
    this.getPerspectiva();
  }
  createFormGroup(){
    return new FormGroup({
      descripcion: new FormControl('',[Validators.required]),
      
    });
  }
  get descripcion() { return this.formPerspectiva.get('descripcion'); }
  guardarPerspectiva(){

  }
  editPerspectiva(){

  }
  deletePerspectiva(){

  }
  getPerspectiva(){
    this.PerspectivaService.getPerspectivas(this.idMapa).subscribe((data)=>{
      this.rowData=data;
    })
  }
  addPerspectiva(){
    this.formPerspectiva.markAllAsTouched();
    if(!this.formPerspectiva.invalid){
      this.perspectiva.id_mapa=this.idMapa;
      this.PerspectivaService.insertPerspectiva(this.perspectiva).subscribe((data:any)=>{
        if(data.success){
          this.getPerspectiva();
          showConfirm('Exito',data.message);  
        }
      })
    }
  }
}
