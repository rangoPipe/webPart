export interface LendingResult {
    success:boolean;
    message?:String;
}

export interface LendingFilter {
    userName?:String;
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
    nroExpediente?: string;
    nroRadicado?: string;
    nombre_expediente?: string;
    nombre_seccion?: string;
    nombre_subseccion?: string;
    nombre_serie?: string;
}

export interface LendingResultFilter extends LendingResult {
    result?: LendingFilter
}

export interface LendingResultDTO extends LendingResult {
    result?: LendingDTO[]
}