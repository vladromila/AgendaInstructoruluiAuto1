import { LOGIN_START, LOGIN_FAILED, LOGIN_SUCCESS, SIGNUP_START, SIGNUP_FAILED, SIGNUP_SUCCESS, LOGIN_WITH_FACEBOOK_START, LOGIN_WITH_FACEBOOK_FAIL, LOGIN_WITH_FACEBOOK_SUCCESS, PASSWORD_RESET_START, PASSWORD_RESET_SUCCESS, PASSWORD_RESET_FAIL } from "../actions/types";
const INITAL_STATE = { loginLoading: false, loginError: '', signupLoading: false, signupError: '', loginWithFacebookLoading: false, presetLoading: false, presetSuccess: false }
export default (state = INITAL_STATE, action) => {
    switch (action.type) {
        case 'presetReset':
            return { ...state, presetSuccess: false }
        case LOGIN_WITH_FACEBOOK_START:
            return { ...state, loginWithFacebookLoading: true }
        case LOGIN_WITH_FACEBOOK_FAIL:
            return { ...state, loginWithFacebookLoading: false }
        case LOGIN_WITH_FACEBOOK_SUCCESS:
            return { ...state, loginWithFacebookLoading: false }
        case LOGIN_START:
            return { ...state, loginLoading: true }
        case LOGIN_FAILED:
            return { ...state, loginLoading: false, loginError: action.payload }
        case LOGIN_SUCCESS:
            return { ...state, loginLoading: false }
        case PASSWORD_RESET_START:
            return { ...state, presetLoading: true };
        case PASSWORD_RESET_SUCCESS:
            return { presetSuccess: true, presetLoading: false };
        case PASSWORD_RESET_FAIL:
            return { presetSuccess: false, presetLoading: false }
        case SIGNUP_START:
            return { ...state, signupLoading: true }
        case SIGNUP_FAILED:
            return { ...state, signupLoading: false, signupError: action.payload }
        case SIGNUP_SUCCESS:
            return { ...state, signupLoading: false }
        default: return state
    }
}