import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";


@Component({
  selector: "app-modal-contrasenia",
  templateUrl: "./modal-contrasenia.component.html",
  styleUrls: ["./modal-contrasenia.component.scss"],
})
export class ModalContraseniaComponent implements OnInit {
  @Output() empresaout: EventEmitter<any> = new EventEmitter();
  public formUpdate: FormGroup;
  update = {
    anterior: null,
    nueva: null,
  };
  hide=true;
  hide2=true;
  constructor() {
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
  ngOnInit(): void {}
}
