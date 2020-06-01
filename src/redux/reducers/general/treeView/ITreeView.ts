import * as React from "react";
import { SingleSelectTreeViewProps, TreeItemProps } from "@material-ui/lab";

export interface ITreeViewProps extends SingleSelectTreeViewProps {
    childs?: TreeItemProps[];
}