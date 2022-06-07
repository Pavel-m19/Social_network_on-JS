import React, { useState } from "react";
import s from './UploadPhoto.module.css'
import uploadIcon from '../../../assets/file-upload.png'
import dotsLoader from '../../../assets/button_loading.gif'

const PhotoModal = (props) => {


    let [avatarFile, setAvatarFile] = useState('');

    const mainPhoto = (e) => {
        if (e.target.files.length) {
            setAvatarFile(e.target.files[0])
        }
    }

    const upploadPhoto = (e) => {        
        e.stopPropagation()
        props.postAvatar(avatarFile);
        setAvatarFile('');
    }

    const modalClose = (e) => {
        props.photoUpploader(false)
    }

    document.body.addEventListener('keydown', e => {        
        if (e.key==='Escape'||e.key==='Esc') {
            e.preventDefault();
            modalClose()
        }        
    })

    return <div>
        <div className={s.modal__background} onClick={modalClose}>

            <div className={s.modal__window} onClick={(e) => e.stopPropagation()}>

                <div className={s.file__upload_wrapper}>
                    <input type={'file'} id="input__file" className={s.file__input} onChange={mainPhoto} />
                    <label htmlFor="input__file" className={s.input__file_button}>
                        <span className={s.input__file_icon_wrapper}>
                            <img className={s.input__icon} src={uploadIcon} alt="1" />
                        </span>
                        <span className={s.input__file_button_text}>{avatarFile ?
                            avatarFile.name : "Выберите файл"}</span>
                    </label>
                </div>

                <div className={s.uppload__button_wrapper}>
                    {props.isFetch ? <img className={s.button__loading} src={dotsLoader} alt='loading' /> :                         
                    <button onClick={(e) => upploadPhoto(e)} disabled={!avatarFile}>upload</button>}
                </div>

            </div>
        </div>

    </div>
}

export default PhotoModal

