import { IS_AUTOMATIC_TYPE_SELECT_WANTED, CONNECTION_STATUS_CHANGE } from "./types";

export const setIsAutomaticTypeSelectWanted = (value) => {
    return ({ type: IS_AUTOMATIC_TYPE_SELECT_WANTED, payload: value })
}

export const connectionStatusChange = (value) => {
    return ({ type: CONNECTION_STATUS_CHANGE, payload: value })
}