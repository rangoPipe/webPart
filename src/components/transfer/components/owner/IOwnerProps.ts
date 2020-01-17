export interface IOwnerState {
    title?:string;
}

export interface IOwnerProps extends IOwnerState {

}



export interface IOwnerWebPartProps {}

export class ColumnRecordOwner {
    public key: string;
    public count?:string;
    public nroExpediente?:string;
    public name?:string;
    public serie?:string;
    public subserie?:string;
    public endDate?:string;
}