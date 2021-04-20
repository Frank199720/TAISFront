import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Perspectiva } from '../interfaces/perspectiva';
@Injectable({
  providedIn: 'root'
})
export class PerspectivaService {

  private route = environment.rutaApi;
  constructor(private httpCliente:HttpClient) { }
  public getPerspectivas(idMapa:number){
    return this.httpCliente.get(this.route+'/getPerspectivabyRuta/'+idMapa);
  }
  public insertPerspectiva(perspectiva:Perspectiva){
    return this.httpCliente.post(this.route+'/perspectiva',perspectiva);
  }
}
