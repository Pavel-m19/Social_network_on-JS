import React from "react";
import { useFormik } from "formik";
import s from "./ProfileForm.module.css"

let ProfileInfoForm = (props) => {

    const submiter = (values) => {
        props.profileEditor(false);

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

        <button type="submit" disabled={!former.dirty}>submit</button>

    </form>

}

export default ProfileInfoForm