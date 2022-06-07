import { applyMiddleware, combineReducers,  legacy_createStore } from "redux"
import dialogReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import thunkMiddleWare from 'redux-thunk';
import {reducer as formReducer } from "redux-form"

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogPage: dialogReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer
})

let store =  legacy_createStore(reducers, (applyMiddleware(thunkMiddleWare)));

window.store = store

export default store;