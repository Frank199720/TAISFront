import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private route=environment.rutaApi;
  constructor(private HttpClient:HttpClient) {
    
  }
  public login (user:Usuario){
    return this.HttpClient.post(this.route+'/login',user);
  }
}
