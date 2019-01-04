import { IS_AUTOMATIC_TYPE_SELECT_WANTED, CONNECTION_STATUS_CHANGE } from "../actions/types";

const INITIAL_STATE = { isAutomaticTypeSelectWanted: false, isConnected:false }

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CONNECTION_STATUS_CHANGE:
            return { ...state, isConnected: action.payload }
        case IS_AUTOMATIC_TYPE_SELECT_WANTED:
            return { ...state, isAutomaticTypeSelectWanted: action.payload }
        default:
            return state;
    }

}