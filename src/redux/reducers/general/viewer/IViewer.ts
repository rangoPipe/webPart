import * as React from "react";

export interface IViewerProps {
    path?: string;
    className?: string[];
    onClick?: (e:React.MouseEvent<HTMLImageElement, MouseEvent>) => void;
    items?:  IViewerItem[];  
}

export interface IViewerItem {
    src: string;
    alt?: string;
}