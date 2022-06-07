/* eslint-disable eqeqeq */
import { getUsersAPI, subscribeAPI } from '../API/api'

const SUBSCRIBE = 'SUBSCRIBE';
const SUBSCRIBE_FETCH = 'SUBSCRIBE_FETCH';
const SET_USERS = 'SET_USERS';
const PAGE_SELECT = 'PAGE_SELECT';
const USERS_COUNT = 'USERS_COUNT';
const FETCH_STATUS_CHANGER = 'FETCH_STATUS_CHANGER';
const SET_USERS_SCROLL = 'SET_USERS_SCROLL';
const FETCH_SCROLL_STATUS_CHANGER = 'FETCH_SCROLL_STATUS_CHANGER'
const SCROLL_DELETER = 'SCROLL_DELETER'
const SET_USERS_PER_PAGE = 'SET_USERS_PER_PAGE'


let initialState = {
    users: [],
    userId: 1,
    pageSize: 5,
    totalUsersCount: 5,
    currentPage: 1,
    isFetching: false,
    scrollIsFetching: false,
    subscribeFetching: []
};
const usersReducer = (state = initialState, action) => {

    switch (action.type) {

        case SUBSCRIBE: {
            let stateCopy = {
                ...state,
                users: state.users.map((u) => {
                    if (u.id === action.id) {
                        return { ...u, followed: !u.followed };
                    }
                    return u;
                })
            }
            return stateCopy;
        }
        case SET_USERS: {
            return { ...state, users: action.usersList }
        }
        case PAGE_SELECT: {
            return { ...state, currentPage: action.number }
        }
        case USERS_COUNT: {
            return { ...state, totalUsersCount: action.count }
        }
        case FETCH_STATUS_CHANGER: {
            return { ...state, isFetching: action.isFetching }
        }
        case SUBSCRIBE_FETCH: {
            let newArray = state.subscribeFetching;
            if (newArray.some(id => id === action.status)) {
                newArray = newArray.filter(el => el != action.status)
            } else { newArray.push(action.status) }

            return { ...state, subscribeFetching: newArray }
        }
        case SET_USERS_SCROLL: {            
            return {
                ...state,
                users: [...state.users, ...action.usersList]                
            }
        }
        case FETCH_SCROLL_STATUS_CHANGER: {
            return { ...state, scrollIsFetching: action.isFetching }
        }
        case SCROLL_DELETER: {
            let delScrollUsers = state.users.slice(0, state.pageSize)
            return {...state, users: delScrollUsers}
        }
        case SET_USERS_PER_PAGE: {
            return {...state, pageSize: action.count, currentPage: action.number }
        }
        default: return state
    }
}

export const subscribe = (id) => ({
    type: SUBSCRIBE,
    id
});

export const subscribeFetcher = (status) => ({
    type: SUBSCRIBE_FETCH,
    status
})

export const setUsers = (users) => ({ type: SET_USERS, usersList: users });

export const setUsersScroll = (users) => ({ type: SET_USERS_SCROLL, usersList: users });

export const pageSelect = (num) => ({ type: PAGE_SELECT, number: num });

export const usersCount = (cnt) => ({ type: USERS_COUNT, count: cnt });

export const fetchStatus = (status) => ({ type: FETCH_STATUS_CHANGER, isFetching: status })

export const fetchScrollStatus = (status) => ({ type: FETCH_SCROLL_STATUS_CHANGER, isFetching: status })

export const scrollUsersDelete = () => ({type: SCROLL_DELETER})

export const setUsersPerPage = (count, number) => ({type: SET_USERS_PER_PAGE, count, number})

//thunks

export const getUsersThunkCreator = (currentPage, pageSize) => {
    return (dispatch) => {
        dispatch(fetchStatus(true))
        dispatch(setUsers([]));        
        getUsersAPI(currentPage, pageSize).then(resp => {
            dispatch(fetchStatus(false));
            dispatch(setUsers(resp.items))
            dispatch(usersCount(resp.totalCount))
        })

    }
}

export const subscriberThunkCreator = (method, user) => {
    return (dispatch) => {
        dispatch(subscribeFetcher(user.id));

        subscribeAPI(method, user).then(res => {
            if (res.resultCode === 0) {
                dispatch(subscribe(user.id));
                dispatch(subscribeFetcher(user.id));
            };
        })
    }
}

export const getUsersScrollThunkCreator = (currentPage, pageSize) => {
    return (dispatch) => {
        dispatch(fetchScrollStatus(true))
        
        getUsersAPI((currentPage + 1), pageSize).then(resp => {
            
            dispatch(setUsersScroll(resp.items))
            dispatch(usersCount(resp.totalCount))
            dispatch(fetchScrollStatus(false))
        })
    }
}

export default usersReducer;