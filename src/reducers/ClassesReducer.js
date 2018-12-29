import { CLASS_CREATE_START, CLASS_CREATE_SUCCESS, CLASS_EDIT_START, CLASS_EDIT_SUCCESS, CLASS_EDIT_FAIL, CLASS_CANCEL_DELETE_START, CLASS_CANCEL_DELETE_SUCCESS, CLASS_CANCEL_DELETE_FAIL, CLASS_CANCEL_OH_DELETE, CLASS_DELETE_START, CLASS_DELETE_SUCCESS, CLASS_DELETE_FAIL, CLASS_OH_DELETE } from "../actions/types";

const INITIAL_STATE = { createLoading: false, createSuccess: false, editLoading: false, editSuccess: false, classCancelDeleteLoading: false, classCancelDeleteSuccess: false, isClassCancelDeleteModalVisible: false, classDeleteLoading: false, classDeleteSuccess: false, isClassDeleteModalVisible: false }

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CLASS_CREATE_START:
            return { ...state, createLoading: true }
        case CLASS_CREATE_SUCCESS:
            return { ...state, createLoading: false, createSuccess: true }
        case CLASS_EDIT_START:
            return { ...state, editLoading: true }
        case CLASS_EDIT_SUCCESS:
            return { ...state, editLoading: false, editSuccess: true }
        case CLASS_EDIT_FAIL:
            return INITIAL_STATE;
        case CLASS_CANCEL_OH_DELETE:
            return { ...state, isClassCancelDeleteModalVisible: !state.isClassCancelDeleteModalVisible };
        case CLASS_CANCEL_DELETE_START:
            return { ...state, classCancelDeleteLoading: true };
        case CLASS_CANCEL_DELETE_SUCCESS:
            return { ...state, classCancelDeleteLoading: false, classCancelDeleteSuccess: true, isClassCancelDeleteModalVisible: false };
        case CLASS_CANCEL_DELETE_FAIL:
            return INITIAL_STATE;
        case CLASS_OH_DELETE:
            return { ...state, isClassDeleteModalVisible: !state.isClassDeleteModalVisible }
        case CLASS_DELETE_START:
            return { ...state, classDeleteLoading: true }
        case CLASS_DELETE_SUCCESS:
            return { ...state, classDeleteLoading: false, classDeleteSuccess: true, isClassDeleteModalVisible: false }
        case CLASS_DELETE_FAIL:
            return INITIAL_STATE;
        case 'resetClass':
            return INITIAL_STATE;
        default:
            return state;
    }
}
