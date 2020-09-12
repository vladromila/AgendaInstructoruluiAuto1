import { AsyncStorage } from 'react-native'
const INITIAL_STATE = { classes: [], students: [], exams: [], theoryExams: [], finishedStudents: [], rStudents: [], canceledClasses: [], inStudents: [], info: {}, messages: [] }
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'classesLocal':
            return { ...state, classes: action.payload }
        case 'studentsLocal':
            return { ...state, students: action.payload }
        case 'examsLocal':
            return { ...state, exams: action.payload }
        case 'inStudentsLocal':
            return { ...state, inStudents: action.payload }
        case 'finishedStudentsLocal':
            return { ...state, finishedStudents: action.payload }
        case 'rStudentsLocal':
            return { ...state, rStudents: action.payload }
        case 'infoLocal':
            return { ...state, info: action.payload }
        case 'classes':
            AsyncStorage.setItem('classes', JSON.stringify(action.payload))
            return { ...state, classes: action.payload }
        case 'students':
            AsyncStorage.setItem('students', JSON.stringify(action.payload))
            return { ...state, students: action.payload }
        case 'exams':
            AsyncStorage.setItem('exams', JSON.stringify(action.payload))
            return { ...state, exams: action.payload }
        case 'theoryExams':
            AsyncStorage.setItem('theoryExams', JSON.stringify(action.payload))
            return { ...state, theoryExams: action.payload }
        case 'messages':
            return { ...state, messages: action.payload }
        case 'finishedStudents':
            AsyncStorage.setItem('finishedStudents', JSON.stringify(action.payload))
            return { ...state, finishedStudents: action.payload }
        case 'rStudents':
            AsyncStorage.setItem('rStudents', JSON.stringify(action.payload))
            return { ...state, rStudents: action.payload }
        case 'inStudents':
            AsyncStorage.setItem('inStudents', JSON.stringify(action.payload))
            return { ...state, inStudents: action.payload }
        case 'info':
            AsyncStorage.setItem('info', JSON.stringify(action.payload))
            return { ...state, info: action.payload }
        default:
            return state
    }
}