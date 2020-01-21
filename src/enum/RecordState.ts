/**
 * Estados para los expedientes en el proceso de transferencias.
 */

export enum RecordState {
    EnGestion = 1,
    ParaGestion = 2,
    AprobadoParaAC = 3,
    PospuestoParaAC = 4,
    AprobadoEnAC = 5,
    RechazadoEnAC = 6,
    EnAC = 7,
    ParaAc = 8
}