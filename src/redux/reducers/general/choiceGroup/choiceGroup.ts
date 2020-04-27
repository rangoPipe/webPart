import { createChoiceGroup, selectChoiceGroup } from "../../../actions/general/choiceGroup/_actionName";
import { IAction } from "../../../namespace";
import { IChoiceGroupProps } from "./IChoiceGroupProps";

const defaultState:IChoiceGroupProps = {
    defaultSelectedKey:"",
    options:[],
    optionSelected: undefined
};

function reducer(state = defaultState, { type, payload }:IAction) : IChoiceGroupProps {    
    switch(type) {
        case createChoiceGroup: {                                  
            return {
                ...state,
                ...payload
            };
        }
        case selectChoiceGroup: {                                  
            return {
                ...state,
                optionSelected: payload
            };
        }
        default:
            return state;
    }
}

export default reducer;