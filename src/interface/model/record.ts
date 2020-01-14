export default interface IRecord {
     idExpediente: number;
     IdVersionTablaRetencionDocumental?: number;
     IdSeccion?: number;
     IdSubserie?: number;
     IdUsuarioResponsable?: number;
     NumeroExpediente?: string;
     CodigoTablaRetencionDocumental?: string;
     Nombre?: string;
     idUbicacionExpediente?: number;
     cerrado?: boolean;
     idNivelSeguridad?: number;
     idEstadoExpediente?: number;
     heredarSeguridad?: boolean;
     observaciones?: string;
     codigoCargaMasiva?: string;
}