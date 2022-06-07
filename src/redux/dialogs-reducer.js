const UPDATE_MASSAGE_TEXT = 'UPDATE_MASSAGE_TEXT'
const NEW_MASSAGE = 'NEW_MASSAGE'

let initialState = {
    dialogUserList: [
        { id: 1, name: 'Вася' },
        { id: 2, name: 'Петя' },
        { id: 3, name: 'Настя' }
    ],

    dialogContent: [
        { id: "my", massage: 'Привет' },
        { id: "comp", massage: 'Привет!' }
    ],
    newMassageText: ''
}

const dialogReducer = (state = initialState, action) => {

    let stateCopy = {
        ...state,
        dialogContent: [...state.dialogContent]
    };

    switch (action.type) {
        case UPDATE_MASSAGE_TEXT: {            
            stateCopy.newMassageText = action.newText;
            return stateCopy
        }
        case NEW_MASSAGE: {                        

            if (stateCopy.newMassageText === '') { return state }

            let newMassage = {
                id: action.id,
                massage: state.newMassageText
            }            
            stateCopy.dialogContent.push(newMassage);
            stateCopy.newMassageText = '';
            return stateCopy;
        }
        default: return state
    }
}

export const updateMassageText = (text) => ({
    type: UPDATE_MASSAGE_TEXT,
    newText: text
})

export const postNewMassage = (author) => ({
    type: NEW_MASSAGE,
    id: author
})

export default dialogReducer;