import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Objetivo } from '../interfaces/objetivo';

@Injectable({
  providedIn: 'root'
})
export class ObjetivoService {

  private route = environment.rutaApi;
  constructor(private httpCliente:HttpClient) { }
  public getObjetivos(idPerspectiva:number){
    return this.httpCliente.get(this.route+'/getObjetivobyPerspectiva/'+idPerspectiva)
  }
  public insertObjetivo(Objetivo:Objetivo){
    return this.httpCliente.post(this.route+'/objetivo',Objetivo);
  }
}
