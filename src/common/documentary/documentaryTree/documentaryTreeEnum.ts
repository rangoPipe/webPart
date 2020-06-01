export enum DocumentaryTreeEnum {
    state = "stateDocumentaryTree",
    contextDocumentary = "contextDocumentary",
    btnFondo = "btnFondo",
    btnSeccion = "btnSeccion",
    btnSubseccion = "btnSubseccion",
    btnSerie = "btnSerie",
    btnSubserie = "btnSubserie",
    btnTipo = "btnTipo",
}

export enum TypeFolderEnum {
    Fondo = "Fondo",
    Seccion = "Seccion",
    Subseccion = "Subseccion",
    Serie = "Serie",
    Subserie = "Subserie",
    TipoDocumental = "TipoDocumental",
}
export interface IDocumentary {
    ID: string;
    Title: string;
    Codigo: string;
    Seleccion: boolean;
    Eliminacion: boolean;
    Digitalizacion: boolean;
    Conservacion: boolean;
    TiempoCentral: number;
    TiempoGestion: number;
    TiempoHistorico: number;
    Fondo:IDocumentary[];
    Seccion:IDocumentary[];
    Subseccion:IDocumentary[];
    Serie:IDocumentary[];
    Subserie:IDocumentary[];
}