import dialogReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";

let store = {
  _state: {
    profilePage: {
      posts: [
        { text: 'Hi! How are you?', avatar: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000", id: 0 },
        { text: 'FIRST POST', avatar: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000", id: 1 },
        { text: '1', avatar: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000", id: 2 },
        { text: '2', avatar: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000", id: 3 }
      ],
      newPostText: 'Введите текст'
    },

    dialogPage: {
      dialogUserList: [
        { id: 1, name: 'Вася' },
        { id: 2, name: 'Петя' },
        { id: 3, name: 'Настя' }
      ],

      dialogContent: ["Привет", "Привет!", "Как дела?"],
      newMassageText: 'введите текст сообщения'
    }
  },

  getState() {
    return this._state
  },

  _callSubscriber() { },

  observe(observer) {
    this._callSubscriber = observer
  },

  dispatch(action) {

    this._state.profilePage = profileReducer(this._state.profilePage, action);
    this._state.dialogPage = dialogReducer(this._state.dialogPage, action);

    this._callSubscriber(this._state);
  }
};

window.state = store;

export default store;