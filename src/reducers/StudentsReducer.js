import { STUDENT_CREATE_START, STUDENT_CREATE_SUCCESS, STUDENT_EDIT_START, STUDENT_EDIT_SUCCESS, STUDENT_OH_DELETE, STUDENT_DELETE_START, STUDENT_DELETE_SUCCESS, STUDENT_IN_START, STUDENT_IN_SUCCESS, STUDENT_OH_IN, STUDENT_INTOA_START, STUDENT_INTOA_SUCCESS, STUDENT_OH_INTOA } from "../actions/types";

const INITIAL_STATE = { createLoading: false, createSuccess: false, editLoading: false, editSuccess: false, deleteLoading: false, deleteSuccess: false, inLoading: false, inSuccess: false, inToALoading: false, inToAsuccess: false, isInToAStudentModalVisible: false, isToInStudentModalVisible: false, isDeleteStudentModalVisible: false }
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'resetStudent':
        return {...INITIAL_STATE};
        case STUDENT_CREATE_START:
            return { ...state, createLoading: true }
        case STUDENT_CREATE_SUCCESS:
            return { ...state, createLoading: false, createSuccess: true }
        case STUDENT_EDIT_START:
            return { ...state, editLoading: true }
        case STUDENT_EDIT_SUCCESS:
            return { ...state, editLoading: false, editSuccess: true }
        case STUDENT_OH_DELETE:
            return { ...state, isDeleteStudentModalVisible: !state.isDeleteStudentModalVisible }
        case STUDENT_DELETE_START:
            return { ...state, deleteLoading: true }
        case STUDENT_DELETE_SUCCESS:
            return { ...state, deleteLoading: false, deleteSuccess: true, isDeleteStudentModalVisible: false }
        case STUDENT_OH_IN:
            return { ...state, isToInStudentModalVisible: !state.isToInStudentModalVisible }
        case STUDENT_IN_START:
            return { ...state, inLoading: true }
        case STUDENT_IN_SUCCESS:
            return { ...state, inLoading: false, inSuccess: true, isToInStudentModalVisible: false }
        case STUDENT_OH_INTOA:
            return { ...state, isInToAStudentModalVisible: !state.isInToAStudentModalVisible }
        case STUDENT_INTOA_START:
            return { ...state, inToALoading: true }
        case STUDENT_INTOA_SUCCESS:
            return { ...state, inToALoading: false, inToALoading: false, isInToAStudentModalVisible: false }
        default:
            return state;
    }
}