import { AsyncStorage } from 'react-native'
const INITIAL_STATE = { classes: [], students: [], exams: [], finishedStudents: [], rStudents: [], canceledClasses: [], inStudents: [], info: {}, messages: [] }
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'classesLocal':
            return { ...state, classes: action.payload }
        case 'studentsLocal':
            return { ...state, students: action.payload }
        case 'classes':
            AsyncStorage.setItem('classes', JSON.stringify(action.payload))
            return { ...state, classes: action.payload }
        case 'students':
            AsyncStorage.setItem('students', JSON.stringify(action.payload))
            return { ...state, students: action.payload }
        case 'exams':
            return { ...state, exams: action.payload }
        case 'messages':
            return { ...state, messages: action.payload }
        case 'finishedStudents':
            return { ...state, finishedStudents: action.payload }
        case 'rStudents':
            return { ...state, rStudents: action.payload }
        case 'canceledClasses':
            return { ...state, canceledClasses: action.payload }
        case 'inStudents':
            return { ...state, inStudents: action.payload }
        case 'info':
            return { ...state, info: action.payload }
        default:
            return state
    }
}