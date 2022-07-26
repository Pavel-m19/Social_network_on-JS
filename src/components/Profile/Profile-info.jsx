import React from "react";
import p from './Profile.module.css'

let ProfileInfo = (props) => {
    return <div>
        <div>
            <b>About me:</b>
            <span>{props.profilePage.userPage.aboutMe}</span>
        </div>

        <div>
            <b>Contacts:</b>
            <div className={p.contacts_block}>
                <div>
                    <b>Instagram:</b>
                    <span>
                        <a href={`${props.profilePage.userPage.contacts.instagram}`}
                            className={p.contacts_link}>
                            {props.profilePage.userPage.contacts.instagram ? 'instagram.com/...' : ''}
                        </a>
                    </span>
                </div>
                <div>
                    <b>VK:</b>
                    <span>
                        <a href={`${props.profilePage.userPage.contacts.vk}`}
                            className={p.contacts_link}>
                            {props.profilePage.userPage.contacts.vk ? 'vk.com/...' : ''}
                        </a>
                    </span>
                </div>
                <div>
                    <b>YouTube:</b>
                    <span>
                        <a href={`${props.profilePage.userPage.contacts.youtube}`}
                            className={p.contacts_link}>
                            {props.profilePage.userPage.contacts.youtube ? 'youtube.com/...' : ''}
                        </a>
                    </span>
                </div>
            </div>
        </div>

        <div>
            <b>Looking for a job:</b>
            <span>{props.profilePage.userPage.lookingForAJobDescription}</span>
        </div>
    </div>
}

export default ProfileInfo