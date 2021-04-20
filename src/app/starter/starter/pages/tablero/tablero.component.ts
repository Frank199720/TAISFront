import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ButtonRendererComponent } from "src/app/rendered/button-renderer.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { IndicadorService } from "../../../../services/indicador.service";
import { Indicador } from "src/app/interfaces/indicador";
import { Tablero } from "src/app/interfaces/tablero";
import { TableroService } from "../../../../services/tablero.service";
import { showConfirm } from "src/app/functions/alerts";
import { Router } from '@angular/router';

@Component({
  selector: "app-tablero",
  templateUrl: "./tablero.component.html",
  styleUrls: ["./tablero.component.scss"],
})
export class TableroComponent implements OnInit {
  isEdit: boolean = false;
  frameworkComponents: any;
  addorEdit: boolean = false;
  @ViewChild("contenido") myModalTablero: ElementRef;
  listaIndicador: Indicador[];
  rowDataClicked1 = {};
  rowData: any;
  ruc: string;
  tablero: Tablero = {
    id_tablero: null,
    nom_responsable: null,
    nom_tablero: null,
    objetivo: null,
    sem_ambar: null,
    sem_rojo: null,
    sem_verde: null,
    id_indicador: null,
    responsable: null,
    tab_meta: null,
    continue: false,
  };
  columnDefs = [
    { field: "id_tablero", headerName: "ID" },
    { field: "nom_indicador", headerName: "Indicador" },
    { field: "fecha_creacion", headerName: "Fecha creación" },

    {
      cellRenderer: "buttonRenderer",
      cellRendererParams: {
        onClick: this.editTablero.bind(this),
        class: "btn btn-primary btn-sm",
        icon: "fas fa-edit",
      },
      width: "70px",
    },
    {
      cellRenderer: "buttonRenderer",
      cellRendererParams: {
        onClick: this.generarVista.bind(this),
        class: "btn btn-warning btn-sm",
        label: "",
        icon: "fas fa-eye",
      },
    },
  ];

  constructor(
    private modal: NgbModal,
    private indicadorService: IndicadorService,
    private TableroService: TableroService,
    private route:Router
  ) {
    this.frameworkComponents = {
      buttonRenderer: ButtonRendererComponent,
    };
  }

  ngOnInit(): void {
    this.getTableros();
  }
  getTableros() {
    this.TableroService.getTableros().subscribe((data) => {
      this.rowData = data;
    });
  }
  receptTablero(tablero: Tablero) {
    if (this.isEdit) {
    } else {
      console.log(tablero);
      this.TableroService.insertTablero(tablero).subscribe((data: any) => {
        if (data.success) {
          this.getTableros();
          this.tablero.continue = true;
          showConfirm("Exito", data.message);
        }
      });
    }
  }
  agregarTablero() {
    this.modal.open(this.myModalTablero, { size: "xl", backdrop: false });
  }
  generarVista(e) {
    let id = e.rowData.id_tablero;
    this.route.navigate(['starter/tablero/view',id]);
  }
  editTablero(e) {
    let id = e.rowData.id_tablero;

    this.TableroService.getTableroById(id).subscribe((data: Tablero) => {
      this.isEdit = true;
      this.tablero = data;
      console.log(data);
      this.tablero.continue = true;
      this.tablero.id_tablero = id;
      this.modal.open(this.myModalTablero, { size: "xl", backdrop: false });
    });
  }
}
