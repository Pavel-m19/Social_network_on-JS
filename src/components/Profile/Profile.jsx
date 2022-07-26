import React, { useState } from "react";
import p from './Profile.module.css'
import Posts from "./Posts/Posts";
import Preloader from "../Common/preloader";
import userAva from '../../assets/user_ava.png';
import ProfileStatus from './ProfileStatusWithHooks'
import { Field, reduxForm } from "redux-form";
import { maxLengthCreator } from '../../utilites/validators'
import { Textarea } from "../Common/Textareas/PostTextarea";
import UploadPhotoModal from './Upload-photo/UploadPhotoModal'
import dotsLoader from '../../assets/button_loading.gif'
import ProfileInfo from "./Profile-info";
import ProfileInfoForm from "./Profile-info-form";

const Profile = (props) => {
  let postsElement = props.profilePage.posts.map((el) => <Posts data={el} liker={props.addLike} key={el.id} />)

  let newPost = (formData) => {
    props.addPost(formData.post)
  };

    const maxLengthCount = maxLengthCreator(350)

  let [dragActive, setDragActive] = useState(false);
  let [mouseOnAva, setMouseOnAva] = useState(false);
  let [modalWindow, setModalWindow] = useState(false);
  let [profileInfoEdit, setProfileInfoEdit] = useState(false)

  let myPage = props.profilePage.userPage.userId === props.id

  const photoUpploader = (status) => {
    setModalWindow(status)
  }

  const setdragStatus = (e, status) => {
    if (myPage) {
      e.preventDefault();
      setDragActive(status)
    }
  }

  const onDropHandler = (e) => {
    if (myPage) {
      e.preventDefault()
      setDragActive(false)
      postAvatar(e.dataTransfer.files[0])
    }
  }

  const postAvatar = (photo) => {
    props.avatarChangeThunkCreator(photo)
  }

  const setMouseHover = (status) => {
    if (myPage) {
      setMouseOnAva(status)
    }
  }

  const avatarSelector = () => {
    if (props.profilePage.userPage.photos.large) {
      if (props.profilePage.avatarFetch) {
        return dotsLoader
      } return props.profilePage.userPage.photos.large
    }
    return userAva
  }

  let avatar = avatarSelector()

  let postForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
      <div>
        <Field placeholder={'New post'} name={'post'} component={Textarea} validate={[maxLengthCount]} />
      </div>
      <div>
        <button>Add post</button>
      </div>
    </form>
  }

  const profileEditor = (status) => {
    setProfileInfoEdit(status)
  }  

  const NewPostReduxForm = reduxForm({ form: 'post' })(postForm)

  if (props.profilePage.userPageFetch) {
    return <Preloader fetch={true} />
  }

  return <div>
    {modalWindow && <UploadPhotoModal isFetch={props.profilePage.avatarFetch} postAvatar={postAvatar} photoUpploader={photoUpploader} />}
    <div className={p.user__info}>

      <div className={p.avatar__block}>
        {/* Аватар при наведении мыши */}
        {(mouseOnAva || dragActive) &&

          <div className={p.ava__shadow}
            onClick={() => photoUpploader(true)}
            onMouseLeave={() => setMouseHover(false)}
            onDragLeave={(e) => { console.log('leave'); setdragStatus(e, false) }}
            onDragOver={(e) => setdragStatus(e, true)}
            onDrop={onDropHandler}>

            {/* Поле при наведении мыши */}
            <div className={p.new__ava__info + ' ' + (dragActive && p.active)}>
              {!dragActive && "Для замены фото, нажмите или перетащите сюда файл"}
              {dragActive && "Отпустите для загрузки"}
            </div>

          </div>}

        {/* картинка аватара */}
        <img
          onMouseEnter={() => setMouseHover(true)}
          onDragOver={(e) => setdragStatus(e, true)}
          src={avatar} alt='ava' />

      </div>

      <div className={p.profile__info}>

        <div className={p.profile__text_info}>
          <h2>{props.profilePage.userPage.fullName}</h2>
          <ProfileStatus {...props} />
          {profileInfoEdit ?
            < ProfileInfoForm {...props} profileEditor={profileEditor}/> :
            <ProfileInfo {...props} />}


        </div>

        <div>
          {(!profileInfoEdit && myPage) && <button onClick={() => profileEditor(true)}>Edit profile</button>}
        </div>

      </div>
    </div>

    <NewPostReduxForm onSubmit={newPost}/>

    <div className={p.postHeader}>
      <div>
        <h3>My posts</h3>
      </div>

    </div>
    <div className={p.post__wrapper}>{postsElement}</div>
  </div>
}

export default Profile
