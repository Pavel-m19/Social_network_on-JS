import { profileAPI, newStatusAPI, getStatusAPI, upploadPhotoAPI } from '../API/api'

const ADD_POST = 'ADD-POST';
const UPDATE_POST_TEXT = 'UPDATE-POST-TEXT';
const ADD_LIKE = 'ADD_LIKE';
const SET_USER_PAGE = 'SET_USER_PAGE';
const PAGE_FETCHER = 'PAGE_FETCHER';
const UPDATE_STATUS_TEXT = 'UPDATE_STATUS_TEXT';
const SET_STATUS = 'SET_STATUS';
const STATUS_FETCHER = 'STATUS_FETCHER'
const NEW_AVATAR="NEW_AVATAR"
const AVATAR_FETCHER = 'AVATAR_FETCHER'

let initialState = {
    posts: [
        { text: 'FIRST POST', avatar: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000", id: 0, likeList: [0], likeLogo: "https://www.freepnglogos.com/uploads/heart-png/file-heart-icon-hollow-5.png" },
        { text: 'Hi! How are you?', avatar: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000", id: 1, likeList: [0], likeLogo: "https://www.freepnglogos.com/uploads/heart-png/file-heart-icon-hollow-5.png" },
        { text: '1', avatar: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000", id: 2, likeList: [0], likeLogo: "https://www.freepnglogos.com/uploads/heart-png/file-heart-icon-hollow-5.png" },
        { text: '2', avatar: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000", id: 3, likeList: [0], likeLogo: "https://www.freepnglogos.com/uploads/heart-png/file-heart-icon-hollow-5.png" }
    ],
    newPostText: '',
    currentId: null,
    likeLogo: {
        passive: "https://www.freepnglogos.com/uploads/heart-png/file-heart-icon-hollow-5.png",
        active: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Heart_coraz%C3%B3n.svg/800px-Heart_coraz%C3%B3n.svg.png'
    },
    userPageFetch: true,
    status: '',
    statusFetch: false, 
    avatarFetch: false, 
    userPage: {photos: {large: '',}}      
};

const profileReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: state.posts.length,
                text: action.text,
                avatar: action.userAvatar,
                likeList: [0],
                likeLogo: "https://www.freepnglogos.com/uploads/heart-png/file-heart-icon-hollow-5.png"
            };
            let stateCopy = { ...state };
            stateCopy.posts = [...state.posts]
            stateCopy.posts.push(newPost);
            stateCopy.newPostText = '';
            return stateCopy;
        }

        case UPDATE_POST_TEXT: {
            let stateCopy = { ...state }
            stateCopy.newPostText = action.newText;
            return stateCopy;
        }

        case ADD_LIKE: {
            if (state.posts[action.likePostId].likeList.includes(action.userLikeId)) {
                let stateCopy = { ...state };
                stateCopy.posts = [...state.posts];
                stateCopy.posts[action.likePostId].likeList = state.posts[action.likePostId].likeList.filter(el => el !== action.userLikeId);
                stateCopy.posts[action.likePostId].likeLogo = state.likeLogo.passive;
                return stateCopy
            };

            let stateCopy = { ...state };
            stateCopy.posts = [...state.posts];
            stateCopy.posts[action.likePostId].likeList.push(action.userLikeId);
            stateCopy.posts[action.likePostId].likeLogo = state.likeLogo.active;
            return stateCopy;
        }
        case SET_USER_PAGE: {
            return { ...state, userPage: action.data, currentId: action.id }
        }
        case PAGE_FETCHER: {
            return {...state, userPageFetch: action.status}
        }
        case UPDATE_STATUS_TEXT: {            
            return {...state, statusInputText: action.status}
        }
        case SET_STATUS: {            
            return{...state, status: action.text}
        }
        case STATUS_FETCHER: {
            return {...state, statusFetch: action.status}
        }
        case NEW_AVATAR: {
            return {...state, userPage: {...state.userPage, photos: action.photo} }
        }
        case AVATAR_FETCHER: {
            return {...state, avatarFetch: action.status }
        }
        default: return state
    }
}

export const addPost = (text) => ({
    type: ADD_POST,
    text,
    userAvatar: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000"
});

export const updatePost = (text) => ({
    type: UPDATE_POST_TEXT,
    newText: text
});

export const addLike = (like_post_id, user_like_id = 1) => ({
    type: ADD_LIKE,
    likePostId: like_post_id,
    userLikeId: user_like_id
})

export const setUserPage = (data, id) => ({
    type: SET_USER_PAGE,
    data,
    id
})

export const userPageFetcher = (status) => ({
    type: PAGE_FETCHER,
    status
})

export const setStatus = (text) => ({
    type: SET_STATUS,    
    text
})

export const statusFetcer = (status) => ({
    type: STATUS_FETCHER,
    status
})

export const updateStatusText = (status) => ({
    type: UPDATE_STATUS_TEXT,
    status
})

export const newAvatar = (photo) => ({
    type: NEW_AVATAR,
    photo
})

export const avatarFetcher = (status) => ({
    type: AVATAR_FETCHER,
    status
})

export const statusPostThunkCreator = (status) => {
    return (dispatch) => {    
        dispatch(statusFetcer(true))    
        newStatusAPI(status)
        .then(resp => {
            dispatch(setStatus(status))            
            dispatch(statusFetcer(false))
        })
          
    }
}

export const profileThunkCreator = (userId) => {
    return (dispatch) => {
        dispatch(userPageFetcher(true))           

        profileAPI(userId)
            .then(resp => {       
                console.log(resp)         
                dispatch(setUserPage(resp, userId))                
            })
            .then(() => {
                getStatusAPI(userId)
            .then(resp => {                                            
                dispatch(setStatus(resp.data)) 
                dispatch(userPageFetcher(false))           
            })
            })
        
    }
}

export const avatarChangeThunkCreator = (photo) => {
    return (dispatch) => {
        dispatch(avatarFetcher(true))


        upploadPhotoAPI(photo)
        .then(resp => {            
            dispatch(newAvatar(resp.data.data.photos))
            dispatch(avatarFetcher(false))
        })

    }
}
export default profileReducer;