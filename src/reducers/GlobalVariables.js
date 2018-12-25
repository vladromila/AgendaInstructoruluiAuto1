import { IS_AUTOMATIC_TYPE_SELECT_WANTED } from "../actions/types";

const INITIAL_STATE = { isAutomaticTypeSelectWanted: false }

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case IS_AUTOMATIC_TYPE_SELECT_WANTED:
            return { ...state, isAutomaticTypeSelectWanted: action.payload }
        default:
            return state;
    }

}