/**
 * Namespace para las instancias de los componentes, utilizados por Redux.
 */
export enum PendingNameSpace {
    context = "contextPendingArchivist",
    detailList = "detailListPendingArchivist",
    textArea = "textAreaPendingArchivist",
    messageBar = "messageBarPendingArchivist",
    dialog = "dialogPendingArchivist",
    commandBar = "commandBarPendingArchivist",
}

export enum ApprovedNameSpace {  
    context = "contextApprovedArchivist",
    detailList = "detailListApprovedArchivist",
}

export enum RejectedNameSpace {  
    context = "contextRejectedArchivist",
    detailList = "detailListRejectedArchivist",
}