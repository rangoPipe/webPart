import { IOIPResult } from "../IOIPResult";

export interface LendingFilter {
    userName?:string;
    idSerie?:number | string;
    idSubserie?:number | string;
    idSeccion?:number | string;
    idSubseccion?:number | string;

    serie?: any[];
    subserie?: any[];
    section?: any[];
    subsection?: any[];
}

export interface LendingDTO {
    idPrestamoDocumental?: number;
    idExpediente?: number;
    nroExpediente?: string;
    nroRadicado?: string;
    nombre_expediente?: string;
    nombre_seccion?: string;
    nombre_subseccion?: string;
    nombre_serie?: string;
    nombre_subserie?: string;
    userName?: string;
    userRequest?: string;
    fecha_solicitud?: string;
    fecha_devolucion?: string;
    fecha_entrega?: string;
    estado?:string;
    idEstado?:number | string;
    observacion?: string;
    tipo?:string;
}

export interface LendingResult extends IOIPResult {
    result?: LendingFilter;
}

export interface LendingResultDTO extends IOIPResult {
    result?: LendingDTO[];
}