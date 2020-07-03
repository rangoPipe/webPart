import * as React from "react";

export interface IGridProps {
    items?: IGridItem[];
    itemsPerPage?: number;
    actualPage?: number;
    idPage?: string | number;
    hidden?: boolean;
}

export interface IGridItem {
    id: string | number;
    name?: string;
    path?: string;
    base64?: string;
    label?: string;
    selected?: boolean;
    onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    onSelect?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}