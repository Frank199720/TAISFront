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
  user:Usuario={
    nombre:'Diana',
    apellido:'Sifuentes',
    username:'diana@gmail.com',
    password:'1234'
  }
  ngOnInit(): void {
  }
  login(){
    this.authService.login(this.user).subscribe((res:any)=>{
      console.log(res);
      
      if(res.success){
        localStorage.setItem('token',res.token);
        localStorage.setItem('infoUser',JSON.stringify(res.user));
        this.router.navigateByUrl('admin');
      }
    })
    //this.router.navigateByUrl('starter');
  }
}
