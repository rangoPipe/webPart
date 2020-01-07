export interface LendingResult {
    success:boolean;
    message?:string;
}

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
    fecha_solicitud?: string;
    estado?:string;
    idEstado?:number | string;
    observacion?: string;
    tipo?:string;
}

export interface LendingResultFilter extends LendingResult {
    result?: LendingFilter
}

export interface LendingResultDTO extends LendingResult {
    result?: LendingDTO[]
}