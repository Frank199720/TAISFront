import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Mapa } from '../interfaces/mapa';

@Injectable({
  providedIn: 'root'
})
export class MapaService {
  private ruta = environment.rutaApi;
  constructor(private httpCliente:HttpClient) { }
  public getMapas(ruc:string){
    return this.httpCliente.get(this.ruta+'/getMapabyRuc/'+ruc);
  }
  public insertMapa(mapa:Mapa){
    return this.httpCliente.post(this.ruta+'/mapa',mapa)
  }
}
