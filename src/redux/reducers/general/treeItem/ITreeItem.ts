import * as React from "react";
import { TreeItemProps } from "@material-ui/lab";

export interface ITreeItemProps extends TreeItemProps {
    childs?: ITreeItemProps[];
}