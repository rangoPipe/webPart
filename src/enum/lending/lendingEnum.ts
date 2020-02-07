/**
 * Estados de los prestamos.
 */
export enum EnumEstadoPrestamo
{
    Solicitado = 1,
    Aprobado = 2,
    Rechazado = 3,
    Prestado = 4,
    Cancelado = 5,
    Devolver = 6,
    Devuelto = 7,
    Renovar = 8
}

/**
 * Estados de los prestamos para los reportes.
 */
export enum EnumEstadoPrestamoReporte
{
    Solicitud_enviada = 1,
    Solicitud_recibida = 2,
    Aceptado = 3,
    Rechazado = 4,
    Prestamo = 5,
    Devolucion = 6
}

/**
 * Namespace para las instancias de los componentes, utilizados por Redux.
 */

export enum SearchNameSpace {
    context = "contextSearch",
    detailListSearch = "detailListSearch",
    dropDownSectionSearch = "dropDownSectionSearch",
    dropDownSubsectionSearch = "dropDownSubsectionSearch",
    dropDownSerieSearch = "dropDownSerieSearch",
    dropDownSubserieSearch = "dropDownSubserieSearch",
    buttonSearchSearch = "buttonSearchSearch",
    buttonCancelSearch = "buttonCancelSearch",
    buttonLendSearch = "buttonLendSearch",
    modalSearch = "modalSearch",
    textAreaSearch = "textAreaSearch",
    messageBarSearch = "messageBarSearch",
}

export enum SendedNameSpace {
    context = "contextSended",
    detailListSended = "detailListSended",
    commandBarSended = "commandBarSended",
    modalSended = "modalSended",
    dialogSended = "dialogSended",
    txtFilterDtlSended = "txtFilterDtlSended",
}

export enum ReceivedNameSpace {
    context = "contextReceived",
    detailListReceived = "detailListReceived",
    commandBarReceived = "commandBarReceived",
    modalReceived = "modalReceived",
    textAreaReceived = "textAreaReceived",
    messageBarReceived = "messageBarReceived",
    choiceGroupReceived = "choiceGroupReceived",
    btnLeadReceived = "btnLeadReceived",
    txtFilterDtlReceived = "txtFilterDtlReceived"
}

export enum LendingNameSpace {
    context = "contextLending",
    detailListLending = "detailListLending",
    commandBarLending = "commandBarLending",
    dialogLending = "dialogLending",
    modalLending = "modalLending",
    textAreaLending = "textAreaLending",
    messageBarLending = "messageBarLending",
    txtFilterDtlLending = "txtFilterDtlLending"
}

export enum PaybackNameSpace {
    context = "contextPayback",
    detailListPayback = "detailListPayback",
    commandBarPayback = "commandBarPayback",
    dialogPayback = "dialogPayback",
    txtFilterDtlPayback = "txtFilterDtlPayback"
}

export enum ReportNameSpace {    
    context = "contextReport",
    detailListReport = "detailListReport",
    buttonSearchReport = "buttonSearchReport",
    buttonCancelReport = "buttonCancelReport",
    datePickerStartReport = "datePickerStartReport",
    datePickerEndReport = "datePickerEndReport",
    chkSendedReport = "chkSendedReport",
    chkRequestReport = "chkRequestReport",
    chkAcceptedReport = "chkAcceptedReport",
    chkRejectedReport = "chkRejectedReport",
    chkLendedReport = "chkLendedReport",
    chkPaybackReport = "chkPaybackReport",
    txtFilterDtlReport = "txtFilterDtlReport",
    commandBarReport = "commandBarReport",
    modalReport = "modalReport",
}