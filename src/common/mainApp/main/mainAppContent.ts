export enum MainAppEnum {
    context = "appContext",
    btnAdmin = "btnAdminMainApp",
    btnStructure = "btnStructureMainApp",
    btnSearch = "btnSearchMainApp",
}

export enum MainAppViewEnum {
    Admin = "Administración",
    Structure = "Estructura documental",
    Search = "Buscar documentos"
}

export interface IActionResult {
    success: boolean;
    data : string | IContentTypeResult;
}

interface IContentTypeResult {
    id: {
        StringValue: string;
        TypeId: string;
    };
    name: string;

}