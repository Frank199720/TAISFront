import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../interfaces/usuario';
import {showConfirm,showError} from '../../functions/alerts'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router,private authService:AuthService) { }
  usuario:Usuario={
    usu_nombre:null,
    usu_apellidom:null,
    usu_apellidop:null,
    username:null,
    password:null,
    ruc_empresa:null,
    usu_direccion:null,
    id:null,
    usu_telefono:null,
    id_rol:null,
    usu_dni:null
  }
  ngOnInit(): void {
  }
  login(){
    this.authService.login(this.usuario).subscribe((res:any)=>{
      console.log(res);
      
      if(res.success){
        localStorage.setItem('token',res.token);
        localStorage.setItem('infoUser',JSON.stringify(res.user));
        this.router.navigateByUrl('admin');
      }else{
        showError('Error',res.message);
      }
    })
    //this.router.navigateByUrl('starter');
  }
}
