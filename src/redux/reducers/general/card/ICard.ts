import * as React from "react";
import { CardProps } from "react-bootstrap";

export interface ICardProps extends CardProps {
    contentHeader?: React.ElementType<any>;
    contentBody?:   React.ElementType<any>;
}