export interface Usuario {
    usu_nombre:string;
    usu_apellidom:string;
    usu_apellidop:string;
    username:string;
    password:string;
    ruc_empresa:string;
    usu_direccion:string,
    id?:number,
    
    usu_telefono:string,
    id_rol:number,
    usu_dni:string,
    fecha_creacion?:Date,
    fecha_desactivacion?:Date,
    fecha_edicion?:Date
}
