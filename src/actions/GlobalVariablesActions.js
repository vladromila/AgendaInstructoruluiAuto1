import { IS_AUTOMATIC_TYPE_SELECT_WANTED } from "./types";

export const setIsAutomaticTypeSelectWanted = (value) => {
    return ({ type: IS_AUTOMATIC_TYPE_SELECT_WANTED, payload: value })
}