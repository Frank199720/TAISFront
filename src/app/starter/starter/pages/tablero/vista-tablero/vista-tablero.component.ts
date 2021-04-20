import { TableroService } from '../../../../../services/tablero.service';
import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  AfterViewInit,
} from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { Tablero } from '../../../../../interfaces/tablero';
import { Iniciativa } from '../../../../../interfaces/iniciativa';
import { element } from 'protractor';

@Component({
  selector: "app-vista-tablero",
  templateUrl: "./vista-tablero.component.html",
  styleUrls: ["./vista-tablero.component.scss"],
})
export class VistaTableroComponent implements OnInit, AfterViewInit {

  constructor(private TableroService:TableroService,private activateRoute:ActivatedRoute) {}
  ngAfterViewInit(): void {
    this.TableroService.getIniciativa(this.id).subscribe((data:Iniciativa[])=>{
      this.iniciativa=data;
     
      this.TableroService.getTableroById2(this.id).subscribe((data:Tablero)=>{
        this.tablero=data[0];
        
        console.log(this.iniciativa);
        console.log(this.tablero);
        this.render();
      })
    })
    
  }
  image:ImageBitmapRenderingContext;
  @ViewChild("vistaControl") vistaTablero: any;
  tablero:Tablero={
    tab_meta:null,
    nom_tablero:null,
    responsable:null,
    objetivo:null,
    sem_rojo:null,
    sem_ambar:null,
    sem_verde:null,
    nom_responsable:null,
    id_indicador:null,
    nom_indicador:null,
    resposable:null
  }
  iniciativa:Iniciativa[];
  private cx: CanvasRenderingContext2D;
  private width = 1400;
  private heigth = 800;
  id:string
  ngOnInit(): void {
    this.id = this.activateRoute.snapshot.paramMap.get('id');
  }
  render() {
    const canvas = this.vistaTablero.nativeElement;
    console.log(this.tablero);
    console.log(canvas);
    this.cx = canvas.getContext("2d");
    canvas.width = this.width;
    canvas.height = this.heigth;
    this.cx.lineWidth = 3;
    this.cx.lineCap = "round";
    this.cx.strokeStyle = "#000";
    this.cx.beginPath();
    
    this.cx.arc(110, 300, 100, 0, Math.PI * 2, false);
    this.cx.strokeStyle = "black";
    this.cx.stroke();

    this.cx.beginPath();
    this.cx.font = "20px arial";
    this.cx.fillText("OBJETIVO", 62, 240, 100);
    this.cx.fillText(this.tablero.objetivo,62,300,100);
    
    //this.cx.arrow(130,300, 200, 300, [0, 1, -10, 1, -10, 5]);
    this.cx.fill();

    this.cx.strokeRect(318, 250, 270, 150);
    this.cx.fillText("INDICADOR", 400, 270, 100);
    this.cx.fillText(this.tablero.nom_indicador,400,320,100);
    console.log(this.tablero);
    this.cx.beginPath();
    //this.cx.arrow(370,300, 440, 300, [0, 1, -10, 1, -10, 5]);
    this.cx.fill();

    this.cx.beginPath();
    this.cx.arc(850, 300, 100, 0, Math.PI * 2, false);
    this.cx.fillText("META", 825, 240, 100);
    this.cx.fillText(this.tablero.tab_meta,760,310,150);
    this.cx.strokeStyle = "black";
    this.cx.stroke();

    this.cx.beginPath();

    //this.cx.arrow(560,300, 600, 300, [0, 1, -10, 1, -10, 5]);
    this.cx.fill();

    this.cx.strokeRect(1050, 190, 300, 255);
    this.cx.fillText("SEMÁFORO", 1150, 210, 100);
    this.cx.fillText(this.tablero.sem_rojo,1150,240,100);
    this.cx.fillText(this.tablero.sem_ambar,1150,310,100);
    this.cx.fillText(this.tablero.sem_ambar,1150,390,100);
    console.log(this.tablero)
    this.cx.beginPath();
    //this.cx.arrow(240,400, 240, 350, [0, 1, -10, 1, -10, 5]);
    this.cx.fill();

    this.cx.beginPath();
    //this.cx.arrow(490,400, 490, 360, [0, 1, -10, 1, -10, 5]);
    this.cx.fill();

    this.cx.strokeRect(400, 500, 410, 205);
    this.cx.fillText("INICIATIVAS", 555, 520, 100);
    var medida=40;
    this.iniciativa.forEach((element:Iniciativa)=>{
      
      this.cx.fillText("*"+element.des_iniciativa, 410, 520+medida, 100);
      medida+=40;
    })
    this.cx.beginPath();
    //this.cx.arrow(610,460, 580, 460, [0, 1, -10, 1, -10, 5]);
    this.cx.fill();

    this.cx.strokeRect(1100, 520, 220, 170);
    this.cx.fillText("RESPONSABLE", 1160, 540, 100);
    this.cx.fillText(this.tablero.resposable,1120,580,100);
    
    this.cx.fillStyle = "red";
    this.cx.strokeStyle = "black";
    this.cx.beginPath();
    this.cx.arc(1100, 250, 30, 0, Math.PI * 2, false);
    this.cx.fill();
    this.cx.stroke();

    this.cx.fillStyle = "yellow";
    this.cx.strokeStyle = "black";
    this.cx.beginPath();
    this.cx.arc(1100, 330, 30, 0, Math.PI * 2, false);
    this.cx.fill();
    this.cx.stroke();

    this.cx.fillStyle = "green";
    this.cx.strokeStyle = "black";
    this.cx.beginPath();
    this.cx.arc(1100, 410, 30, 0, Math.PI * 2, false);
    this.cx.fill();
    this.cx.stroke();
    this.cx.fillStyle = "black";
    this.cx.strokeStyle = "black";

    //linea 1
    this.cx.beginPath();
    this.cx.moveTo(210,300);
    this.cx.lineTo(318,300);
    this.cx.stroke();

    this.cx.beginPath();
    this.cx.moveTo(318,300);
    this.cx.lineTo(305,290);
    this.cx.lineTo(305,310);
    this.cx.fill();
    
    //linea2
    this.cx.beginPath();
    this.cx.moveTo(588,300);
    this.cx.lineTo(750,300);
    this.cx.stroke();

    this.cx.beginPath();
    this.cx.moveTo(750,300);
    this.cx.lineTo(737,290);
    this.cx.lineTo(737,310);
    this.cx.fill();

    //linea3
    this.cx.beginPath();
    this.cx.moveTo(950,300);
    this.cx.lineTo(1050,300);
    this.cx.stroke();

    this.cx.beginPath();
    this.cx.moveTo(1050,300);
    this.cx.lineTo(1037,290);
    this.cx.lineTo(1037,310);
    this.cx.fill();
    //linea4
    this.cx.beginPath();
    this.cx.moveTo(1100,580);
    this.cx.lineTo(810,580);
    this.cx.stroke();

    this.cx.beginPath();
    this.cx.moveTo(810,580);
    this.cx.lineTo(823,570);
    this.cx.lineTo(823,590);
    this.cx.fill();

    //linea5
    this.cx.beginPath();
    this.cx.moveTo(450,500);
    this.cx.lineTo(450,400);
    this.cx.stroke();

    this.cx.beginPath();
    this.cx.moveTo(450,400);
    this.cx.lineTo(440,413);
    this.cx.lineTo(460,413);
    this.cx.fill();

    //linea6
    this.cx.beginPath();
    this.cx.moveTo(800,500);
    this.cx.lineTo(850,400);
    this.cx.stroke();

    this.cx.beginPath();
    this.cx.moveTo(850,400);
    this.cx.lineTo(830,410);
    this.cx.lineTo(860,410);
    this.cx.fill();
    
  }
}
