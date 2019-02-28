import { IS_AUTOMATIC_TYPE_SELECT_WANTED, CONNECTION_STATUS_CHANGE, IS_USER_SPECIAL } from "../actions/types";
import firebase from 'firebase';

const INITIAL_STATE = { isAutomaticTypeSelectWanted: false, isConnected: false, value: 40 }

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CONNECTION_STATUS_CHANGE:
            return { ...state, isConnected: action.payload }
        case IS_AUTOMATIC_TYPE_SELECT_WANTED:
            return { ...state, isAutomaticTypeSelectWanted: action.payload }
        case IS_USER_SPECIAL:
            return { ...state, value: action.payload === true ? 30 : 40 }
        default:
            return state;
    }

}