import { getCurrentUserAPI, loginOnSiteAPI, logOutAPI } from '../API/api'

const SET_CURRENT_USER = 'SET_CURRENT_USER';
const ON_FETCHING = 'ON_FETCHING';
const THEME_SWITCHER = 'THEME_SWITCHER';
const INITIALAIZER = 'INITIALAIZER';

let initialState = {
    id: null,
    login: null,
    email: null,
    isFetching: false,
    isAuth: false,
    darkTheme: false,
    initialized: false
};

const authReducer = (state = initialState, action) => {

    switch (action.type) {

        case SET_CURRENT_USER: {
            return { ...state, ...action.data, isAuth: action.isAuth };
        }
        case ON_FETCHING: {
            return { ...state, isFetching: true }
        }
        case THEME_SWITCHER: {
            return { ...state, darkTheme: !state.darkTheme }
        }
        case INITIALAIZER:{
            return {...state, initialized: true}
        }
        default: return state
    }
}

export const setCurrentUser = (id, login, email, isAuth) => ({
    type: SET_CURRENT_USER,
    data: { id, login, email},
    isAuth
});

export const onFetching = () => ({
    type: ON_FETCHING
})

export const themeSwitcher = () => ({
    type: THEME_SWITCHER
})

export const initializer = () => ({
    type: INITIALAIZER
})

export const getCurrentUserThunkCreator = () => {   
    return (dispatch) => {       

    dispatch(onFetching());
        
    return getCurrentUserAPI().then(resp => { 
        console.log(resp)                     
        if (resp.resultCode === 0) {
            dispatch(setCurrentUser(resp.data.id, resp.data.login, resp.data.email, true))
        } else if(resp.resultCode === 1) {
            dispatch(setCurrentUser(null, null, null, false))
        }
    })}
}

export const signIn = (formData) => {
    return (dispatch) => {
        loginOnSiteAPI(formData).then(resp => {                      
            dispatch(getCurrentUserThunkCreator())           
        })
    }
}

export const signOut = () => {
    return (dispatch) => {
        logOutAPI().then (resp => {
            console.log(resp)            
            dispatch(getCurrentUserThunkCreator())                       
        })
    }
}

export const initializeAPP = () => (dispatch) => {

    let promise = dispatch(getCurrentUserThunkCreator());

    Promise.all([promise]).then(resp =>
        {dispatch(initializer())        }
    )
}

export default authReducer;