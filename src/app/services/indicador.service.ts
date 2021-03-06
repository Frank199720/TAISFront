import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Indicador } from '../interfaces/indicador';

@Injectable({
  providedIn: 'root'
})
export class IndicadorService {
  private ruta=environment.rutaApi;
  constructor(private httpClient:HttpClient) { }
  public getIndicadores(ruc:string){
    return this.httpClient.get(this.ruta+'/IndicadorEmpresa/'+ruc);
  }
  public getIndicadorByID(idIndicador:number){
    return this.httpClient.get(this.ruta+'/indicador/'+idIndicador);
  }
  public insertIndicador(indicador:Indicador){
    return this.httpClient.post(this.ruta+'/indicador',indicador);
  }
  public updateIndicador(indicador:Indicador){
    return this.httpClient.put(this.ruta+'/indicador/'+indicador.id_indicador,indicador);
  }
}
