import { createMessageBar } from "../../../actions/general/messageBar/_actionName";
import { MessageBarType } from "office-ui-fabric-react";
import { IAction } from "../../../namespace";
import { IMessageBarProps } from "./IMessageBarProps";

const defaultState:IMessageBarProps = {
    messageBarType: MessageBarType.info,
    isMultiline: false,
    onDismiss: undefined,
    dismissButtonAriaLabel:"Close",
    truncated: false,
    overflowButtonAriaLabel:"See more",
    value: undefined,
    hideMessage: true
};

function reducer(state = defaultState, { type, payload }:IAction) : IMessageBarProps {    
    switch(type) {
        case createMessageBar: {                                  
            return {
                ...state,
                ...payload
            };
        }

        default:
            return state;
    }
}

export default reducer;