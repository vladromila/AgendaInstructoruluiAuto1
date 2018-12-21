import { LOGIN_START, LOGIN_FAILED, LOGIN_SUCCESS, SIGNUP_START, SIGNUP_FAILED, SIGNUP_SUCCESS } from "../actions/types";
const INITAL_STATE = { loginLoading: false, loginError: '', signupLoading: false, signupError: '' }
export default (state = INITAL_STATE, action) => {
    switch (action.type) {
        case LOGIN_START:
            return { ...state, loginLoading: true }
        case LOGIN_FAILED:
            return { ...state, loginLoading: false, loginError: action.payload }
        case LOGIN_SUCCESS:
            return { ...state, loginLoading: false }
        case SIGNUP_START:
            return { ...state, signupLoading: true }
        case SIGNUP_FAILED:
            return { ...state, signupLoading: false, signupError: action.payload }
        case SIGNUP_SUCCESS:
            return { ...state, signupLoading: false }
        default: return state
    }
}