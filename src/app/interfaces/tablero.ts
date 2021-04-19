export interface Tablero {
    id_indicador:number;
    id_tablero?:string;
    nom_responsable:string;
    nom_tablero:string;
    objetivo:string;
    responsable:string;
    sem_ambar:string;
    sem_rojo:string;
    sem_verde:string;
    tab_meta:string;
    continue?:boolean;
}
