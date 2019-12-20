import { RecordState } from "../../enum/RecordState";

export interface MoveRecordDTO
{
    Record? :any[];
    IdUsuario? : number;
    State : RecordState[];
    Description?: String;
}