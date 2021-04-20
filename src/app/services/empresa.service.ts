import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../interfaces/usuario';
import { Company } from '../interfaces/company';
@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  private route = environment.rutaApi;
  constructor(private httpClient:HttpClient) { }
  public getEmpresas(){
    return this.httpClient.get(this.route+'/empresa');
  }
  public insertEmpresa(empresa:Company){
    return this.httpClient.post(this.route+'/empresa',empresa);
  }
  public deleteEmpresa(idEmpresa:string){
    return this.httpClient.delete(this.route+'/empresa/'+idEmpresa);
  }
  public getEmpresaByID(idEmpresa:string){
  
    return this.httpClient.get(this.route+'/empresa/'+idEmpresa);
  }
  public updateEmpresa(empresa:Company,idEmpresa:string){
    return this.httpClient.put(this.route+'/empresa/'+idEmpresa,empresa);
  }
}
