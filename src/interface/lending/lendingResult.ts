import { IOIPResult } from "../IOIPResult";
import { EnumEstadoPrestamoReporte } from "../../enum/lending/lendingEnum";

/**
 * Interfaces para el proceso de prestamos.
 */

export interface LendingFilter {
    userName?:string;
    idSerie?:number | string;
    idSubserie?:number | string;
    idSeccion?:number | string;
    idSubseccion?:number | string;
    idExpediente?:number | string;

    estado?: EnumEstadoPrestamoReporte[];
    fechaInicial?: Date;
    fechaFinal?: Date;

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
    fecha_solicitud_anterior?: string;
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