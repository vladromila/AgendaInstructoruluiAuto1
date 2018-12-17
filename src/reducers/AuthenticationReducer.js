import { LOGIN_START, LOGIN_FAILED, LOGIN_SUCCESS } from "../actions/types";
const INITAL_STATE = { loading: false, error: '' }
export default (state = INITAL_STATE, action) => {
    switch (action.type) {
        case LOGIN_START:
            return { ...state, loading: true }
        case LOGIN_FAILED:
            return { ...state, loading: false, error: action.payload }
        case LOGIN_SUCCESS:
            return { ...state, loading: false }
        default: return state
    }
}