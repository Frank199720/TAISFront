import { AfterViewInit, Component, Input, OnInit, Output } from "@angular/core";
import { EventEmitter } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Usuario } from "src/app/interfaces/usuario";
import { ChangeDetectorRef, AfterContentChecked } from "@angular/core";
import { EmpresaService } from "../../../services/empresa.service";
import { showError } from "../../..//functions/alerts";
import { Company } from "src/app/interfaces/company";
import { Rol } from "src/app/interfaces/rol";
import { UsuarioService } from '../../../services/usuario.service';
@Component({
  selector: "app-modal-usuario",
  templateUrl: "./modal-usuario.component.html",
  styleUrls: ["./modal-usuario.component.scss"],
})
export class ModalUsuarioComponent implements AfterViewInit {
  @Input() usuario: Usuario;

  @Output() userOut: EventEmitter<Usuario> = new EventEmitter();
  public formUsuario: FormGroup;
  listaEmpresa: Company[];
  listaRol: Rol[];
  constructor(
    private formBuilder: FormBuilder,
    private changeDetector: ChangeDetectorRef,
    private EmpresaService: EmpresaService,
    private UsuarioService:UsuarioService
  ) {}
  ngAfterViewInit() {}
  ngOnInit(): void {
    this.formUsuario = this.createFormGroup();
    this.EmpresaService.getEmpresas().subscribe((data: Company[]) => {
      this.listaEmpresa = data;
    });
    this.UsuarioService.getRoles().subscribe((data:Rol[])=>{
      this.listaRol=data;
    })
  }
  sendUser() {
    console.log(this.usuario);
    this.formUsuario.markAllAsTouched();
    if (!this.formUsuario.invalid) {
      this.userOut.emit(this.usuario);
    } else {
      console.log(this.formUsuario);
      showError("Error", "Complete los campos");
    }
  }
  createFormGroup() {
    return new FormGroup({
      dni: new FormControl("", [Validators.required]),
      nombres: new FormControl("", [Validators.required]),
      apellidos: new FormControl("", [Validators.required]),
      direccion: new FormControl("", [Validators.required]),
      celular: new FormControl("", []),
      correo: new FormControl("", []),
      empresa: new FormControl("", [Validators.required]),
      rol: new FormControl("", [Validators.required]),
      // distrito: new FormControl('',[Validators.required]),
      // direccion: new FormControl('',[Validators.required]),
      // contrasenia: new FormControl('',[Validators.required])
    });
  }
  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }
  get dni() {
    return this.formUsuario.get("dni");
  }
  get nombres() {
    return this.formUsuario.get("nombres");
  }
  get apellidos() {
    return this.formUsuario.get("apellidos");
  }
  get direccion() {
    return this.formUsuario.get("direccion");
  }
  get correo() {
    return this.formUsuario.get("correo");
  }
  get celular() {
    return this.formUsuario.get("celular");
  }
  get empresa() {
    return this.formUsuario.get("empresa");
  }
  get rol() {
    return this.formUsuario.get("rol");
  }
  // get distrito() { return this.formUsuario.get('distrito'); }
  // get direccion() { return this.formUsuario.get('direccion'); }
  // get contrasenia() { return this.formUsuario.get('contrasenia'); }
}
