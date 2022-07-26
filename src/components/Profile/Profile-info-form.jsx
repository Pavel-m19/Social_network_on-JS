import React from "react";
import { useFormik } from "formik";
import s from "./ProfileForm.module.css"
import u from "../Users/users.module.css"
import { useEffect } from "react";

let ProfileInfoForm = (props) => {

    const listener = (e) => {         
        if (e.key==='Escape'||e.key==='Esc') {
            e.preventDefault();
            closer()
        }   
    }

    const closer = () => {
        props.profileEditor(false);
        document.body.removeEventListener('keydown', listener, false)
    }

    const submiter = (values) => {
        closer();
        props.profileInfoUpploaderThunkCreator(values,
            props.profilePage.currentId,
            props.profilePage.userPage.fullName)
    }

    const former = useFormik({
        initialValues: {
            aboutMe: props.profilePage.userPage.aboutMe ? props.profilePage.userPage.aboutMe : '',
            insta: props.profilePage.userPage.contacts.instagram ? props.profilePage.userPage.contacts.instagram : '',
            VK: props.profilePage.userPage.contacts.vk ? props.profilePage.userPage.contacts.vk : '',
            youtube: props.profilePage.userPage.contacts.youtube ? props.profilePage.userPage.contacts.youtube : '',
            job: props.profilePage.userPage.lookingForAJobDescription ? props.profilePage.userPage.lookingForAJobDescription : '',
        },
        onSubmit: values => {
            submiter(values)
        },
    });

    useEffect(() => {
        document.body.addEventListener('keydown', listener, false)
    })

    return <form onSubmit={former.handleSubmit} className={s.user_info_block}>
        <div className={s.user_info_wrapper}>
            <div className={s.info_feild}>
                <label htmlFor="About" className={s.input_form_label}> About me </label>
                <input
                    autocomplete="off"
                    className={s.input_feild}
                    onChange={former.handleChange}
                    value={former.values.aboutMe}
                    onBlur={former.handleBlur}
                    id="aboutMe"
                />
            </div>

            <div className={s.contacts_info_wrapper}>
                <div className={s.info_feild}>
                    <label htmlFor="insta" className={s.input_form_label}> Instagram </label>
                    <input
                        autocomplete="off"
                        className={s.input_feild}
                        onChange={former.handleChange}
                        value={former.values.insta}
                        onBlur={former.handleBlur}
                        id="insta"
                    />
                </div>

                <div className={s.info_feild}>
                    <label htmlFor="VK" className={s.input_form_label}> VK </label>
                    <input
                        autocomplete="off"
                        className={s.input_feild}
                        onChange={former.handleChange}
                        value={former.values.VK}
                        onBlur={former.handleBlur}
                        id="VK"
                    />
                </div>

                <div className={s.info_feild}>
                    <label htmlFor="youtube" className={s.input_form_label}> Youtube </label>
                    <input
                        autocomplete="off"
                        className={s.input_feild}
                        onChange={former.handleChange}
                        value={former.values.youtube}
                        onBlur={former.handleBlur}
                        id="youtube"
                    />
                </div>
            </div>

            <div className={s.info_feild}>
                <label htmlFor="job" className={s.input_form_label}> Looking for a job </label>
                <input
                    autocomplete="off"
                    className={s.input_feild}
                    onChange={former.handleChange}
                    value={former.values.job}
                    onBlur={former.handleBlur}
                    id="job"
                />
            </div>

        </div>

        <div className={s.buttons_wrapper}>
            <button type="submit" disabled={!former.dirty}>submit</button>
            <button
                type="reset"
                onClick={() => closer()}
                className={u.search_clear_button}>
                X
            </button>
        </div>

    </form>

}

export default ProfileInfoForm