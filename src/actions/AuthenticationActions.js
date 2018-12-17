import firebase from 'firebase';
import { NavigationActions } from 'react-navigation'
import { LOGIN_START, LOGIN_SUCCESS } from './types';

export const login = ({ email, password }) => {
    return (dispatch) => {
        dispatch({ type: LOGIN_START })
        firebase.auth().signInWithEmailAndPassword(email, password).then(user => {
            dispatch({ type: LOGIN_SUCCESS });
            dispatch(NavigationActions.navigate({ routeName: 'Main' }))
        })
    }
}