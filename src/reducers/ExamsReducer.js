import { EXAM_CREATE_START, EXAM_CREATE_SUCCESS } from "../actions/types";

const INITIAL_STATE = { createLoading: false, createSuccess: false }
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'resetExam':
            return INITIAL_STATE;
        case EXAM_CREATE_START:
            return { ...state, createLoading: true }
        case EXAM_CREATE_SUCCESS:
            return { ...state, createLoading: false, createSuccess: true };
        default:
            return state;
    }
}