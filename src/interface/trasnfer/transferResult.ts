import { IOIPResult } from "../IOIPResult";
import { RecordState } from "../../enum/RecordState";
import IRecord from "../model/record";

/**
 * Interfaces para el proceso de transferencias.
 */

export interface TransferFilter {
    idUsuario?:number;
    userName?:string;
    state:RecordState[];
    description?:string;
    record?:IRecord[];
}

export interface TransferDTO extends IRecord {
    name: string;
    retentionTime: number;
    dateOut: string;
    dateIn: string;
    code: string;
    state: number;
    quantity: number;
    idSerie: number;
    nombreSerie: string;
    nombreSubserie: string;
    nombreUsuario: string;
    nombreSeccion: string;
}

export interface TransferResult extends IOIPResult {
    result?: TransferFilter;
}

export interface TransferResultDTO extends IOIPResult {
    result?: TransferDTO[];
}