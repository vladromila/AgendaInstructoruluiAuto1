import { EXAM_CREATE_START, EXAM_CREATE_SUCCESS, EXAM_ADDC_START, EXAM_ADDC_SUCCESS, EXAM_EDIT_START, EXAM_EDIT_SUCCESS, EXAM_OH_DELETE, EXAM_DELETE_START, EXAM_DELETE_SUCCESS, EXAM_OH_DELETE1 } from "../actions/types";

const INITIAL_STATE = { createLoading: false, createSuccess: false, editLoading: false, editSuccess: false, addCLoading: false, addCSuccess: false, isExamDeleteModalVisible: false, isExamDeleteModalVisible1: false, deleteLoading: false, deleteSuccess: false }
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'resetExam':
            return INITIAL_STATE;
        case EXAM_CREATE_START:
            return { ...state, createLoading: true }
        case EXAM_CREATE_SUCCESS:
            return { ...state, createLoading: false, createSuccess: true };
        case EXAM_EDIT_START:
            return { ...state, editLoading: true }
        case EXAM_EDIT_SUCCESS:
            return { ...state, editLoading: false, editSuccess: true }
        case EXAM_ADDC_START:
            return { ...state, addCLoading: true };
        case EXAM_ADDC_SUCCESS:
            return { ...state, addCLoading: false, addCSuccess: true };
        case EXAM_DELETE_START:
            return { ...state, deleteLoading: true };
        case EXAM_DELETE_SUCCESS:
            return { ...state, deleteLoading: false, deleteSuccess: true, isExamDeleteModalVisible: false }
        case EXAM_OH_DELETE:
            return { ...state, isExamDeleteModalVisible: !state.isExamDeleteModalVisible }
        case EXAM_OH_DELETE1:
            return { ...state, isExamDeleteModalVisible1: !state.isExamDeleteModalVisible1 }
        default:
            return state;
    }
}