export interface IDocumentaryTreeState {
    fondo?: any[];
    seccion?: any[];
    subseccion?: any[];
    serie?: any[];
    subserie?: any[];
}

export interface IDocumentaryTreeProps extends IDocumentaryTreeState {
    onClickItem?: any;
}