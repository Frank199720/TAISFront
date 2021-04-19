import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subproceso } from '../interfaces/subproceso';
@Injectable({
  providedIn: 'root'
})
export class SubprocesoService {
  private ruta=environment.rutaApi;
  constructor(private httpCliente:HttpClient) { }
  public getSubProcesos(idProceso:number){
    return this.httpCliente.get(this.ruta+'/MostrarSubp/'+idProceso);
  }
  public insertSubProceso(subProceso:Subproceso){
    return this.httpCliente.post(this.ruta+'/subproceso',subProceso);
  }
  public updateSubProceso(subProceso:Subproceso){
    return this.httpCliente.put(this.ruta+'/subproceso/'+subProceso.id_subproceso,subProceso);
  }
}
