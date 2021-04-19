import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Proceso } from '../interfaces/proceso';

@Injectable({
  providedIn: 'root'
})
export class ProcesoService {
  private route = environment.rutaApi;
  constructor(private httpCliente:HttpClient) { }
  public guardarProceso(proceso:Proceso){
    return this.httpCliente.post(this.route+'/proceso',proceso);
  }
  public getProcesos(rucEmpresa:string){
    return this.httpCliente.get(this.route+'/listarPxID/'+rucEmpresa);
  }
  public getProcesoByID(id:number){
    return this.httpCliente.get(this.route+'/proceso/'+id);
  }
  public editSubproceso(proceso:Proceso){
    return this.httpCliente.put(this.route+'/proceso/'+proceso.id_proceso,proceso);
  }
}
