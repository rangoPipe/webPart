import { CheckboxVisibility } from "office-ui-fabric-react";
import { createDetailList, loadDetailList, selectRowItem  } from "../../../actions/general/detailList/_actionName";
import { IDetailListProps } from "./IDetailListProps";
import { IAction } from "../../../namespace";

const defaultState:IDetailListProps = {
    items: [],
    columns: [],
    groups : undefined,
    groupProps : undefined,
    checkboxVisibility : CheckboxVisibility.onHover,
    enableShimmer:true,
    selectedItems: [],
    selectionMode: undefined,
    selection: undefined
};

function reducer(state = defaultState, { type, payload }:IAction):IDetailListProps {
    switch(type) {
        case createDetailList: {
            return {
                ...state,
                ...payload
            };
        }
        case loadDetailList: {
            return {
                ...state,
                items : payload,
                enableShimmer: false
            };
        }        
        case selectRowItem: {
            return {
                ...state,
                selectedItems : payload
            };
        }
        default:
            return state;
    }
}

export default reducer;