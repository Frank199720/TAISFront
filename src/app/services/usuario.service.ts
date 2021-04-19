import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private route = environment.rutaApi;
  constructor(private httpClient:HttpClient) { }
  public insertUsuario(usuario:Usuario){
    return this.httpClient.post(this.route+'/usuario',usuario);
  }
  public getRoles(){
    return this.httpClient.get(this.route+'/roles');
  }
  public updateUsuario(usuario:Usuario,userId:number){
    return this.httpClient.put(this.route,usuario)
  }
  public inactiveUser(idUser:number){
    return this.httpClient.delete(this.route+'/usuario/'+idUser);
  }
  public getUsers(){
    return this.httpClient.get(this.route+'/usuario')
  }
  public getUserByID(idUser:number){
  
    return this.httpClient.get(this.route+'/usuario?id='+idUser)
  }
  public resetPassword(idUser:number){
    return this.httpClient.get(this.route+idUser)
  }
}
