import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Tablero } from '../interfaces/tablero';
import { Iniciativa } from '../interfaces/iniciativa';
@Injectable({
  providedIn: 'root'
})
export class TableroService {
  private ruta=environment.rutaApi;
  constructor(private httpClient:HttpClient) { }
  public getCantidadDeRegistros(){
    return this.httpClient.get(this.ruta+'/TotalTableros');
  }
  public getTableros(){
    return this.httpClient.get(this.ruta+'/tablero');
  }
  public insertTablero(tablero:Tablero){
    return this.httpClient.post(this.ruta+'/tablero',tablero);
  }
  public getTableroById(idTablero:string){
    return this.httpClient.get(this.ruta+'/tablero/'+idTablero);
  }
  public insertIniciativa(iniciativa:Iniciativa){
    return this.httpClient.post(this.ruta+'/iniciativa',iniciativa);
  }
  public getIniciativa(idTablero:string){
    return this.httpClient.get(this.ruta+'/IniciativaTab/'+idTablero);
  }
  public updateIniciativa(iniciativa:Iniciativa){
    return this.httpClient.put(this.ruta+'/iniciativa/'+iniciativa.id_iniciativa,iniciativa)
  }
}
