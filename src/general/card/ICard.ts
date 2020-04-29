import { ICardProps as ICard } from "../../redux/reducers/general/card/ICard";

export interface ICardState extends ICard {
    card: ICard
}

export interface ICardProps extends ICardState {
    
}