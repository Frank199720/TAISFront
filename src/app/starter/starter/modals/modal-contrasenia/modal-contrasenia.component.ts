import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { showConfirm, showError } from 'src/app/functions/alerts';
import { UsuarioService } from '../../../../services/usuario.service';


@Component({
  selector: "app-modal-contrasenia",
  templateUrl: "./modal-contrasenia.component.html",
  styleUrls: ["./modal-contrasenia.component.scss"],
})
export class ModalContraseniaComponent implements OnInit {
  
  public formUpdate: FormGroup;
  update = {
    password: null,
    anterior: null,
  };
  hide=true;
  hide2=true;
  constructor(private UsuarioService:UsuarioService) {
    this.formUpdate=this.createFormGroup();
  }
  createFormGroup() {
    return new FormGroup({
      anterior: new FormControl("", [Validators.required]),
      nueva: new FormControl("", [Validators.required]),

      // distrito: new FormControl('',[Validators.required]),
      // direccion: new FormControl('',[Validators.required]),
      // contrasenia: new FormControl('',[Validators.required])
    });
  }
  get anterior() {
    return this.formUpdate.get("anterior");
  }
  get nueva() {
    return this.formUpdate.get("nueva");
  }
  actualizarPassword(){
    this.UsuarioService.changePassword(this.update).subscribe((data:any)=>{
      console.log('hola');
      if(data.success){
        showConfirm('Exito',data.message);
      }
    },
    (err)=>{
      showError('Error',err.error.message);
    })
  }
  ngOnInit(): void {}
}
