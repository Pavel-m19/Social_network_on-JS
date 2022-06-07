import React from "react";
import s from './Profile.module.css'
import dotsLoader from '../../assets/button_loading.gif'
import { useState } from "react";
import { useEffect } from "react";

const ProfileStatusWithHooks = (props) => {      

    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.profilePage.status);    
    let statusArea = React.createRef()

    useEffect( () => {
        setStatus(props.profilePage.status)
    }, [props.profilePage.status])

    let myId = props.profilePage.currentId !== props.id

    const activateEditMod = () => {
        if (myId) {return}
        setEditMode(true)
    }

    const deActivateEditMod = () => {
        setEditMode(false)        
        props.statusPostThunkCreator(status)        
    }

    const onStatusChange = () => {
        setStatus(statusArea.current.value)
    }

        return (
            <>
                {!editMode &&
                    <div className={s.postHeader}>
                        {!props.profilePage.statusFetch &&                        
                            <span onClick={activateEditMod}>                                 
                                {status && status} 
                                {!status &&  !myId && 'Input status'}
                            </span>}
                        {props.profilePage.statusFetch &&
                            <img className={s.loading} src={dotsLoader} alt='loading' />}                           
                    </div>}
                {/* //ELSE */}
                {editMode && <div>
                    <input autoFocus={true} 
                    onBlur={deActivateEditMod} 
                    onChange={onStatusChange}
                    value={status}
                    ref={statusArea}/>
                </div>}
            </>
        )    
}

export default ProfileStatusWithHooks