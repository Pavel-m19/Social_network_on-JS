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
                        <a href={`https://www.${props.profilePage.userPage.contacts.instagram}`}>
                            {props.profilePage.userPage.contacts.instagram}
                        </a>
                    </span>
                </div>
                <div>
                    <b>VK:</b>
                    <span>{props.profilePage.userPage.contacts.vk}</span>
                </div>
                <div>
                    <b>YouTube:</b>
                    <span>{props.profilePage.userPage.contacts.youtube}</span>
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