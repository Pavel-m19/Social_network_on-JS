import React from "react";
import s from './PostTextareas.module.css'

export const Textarea = ({ input, meta, ...props }) => {
    const hasError = meta.touched && meta.error;
    
    return (
        <div className={s.post_input_block}>
            <textarea {...input} {...props} className={s.form + ' ' + (hasError && s.error)}/>
            { hasError && <div><div className={s.error_mark}>{meta.error}</div></div>}            
        </div>
    )
}

export const LoginArea = ({ input, meta, ...props }) => {    
    const hasError = meta.touched && meta.error;
    return (
        <div className={s.post_input_block}>
            <input {...input} {...props} className={s.input_feild + ' ' + (hasError && s.error)} />
            { hasError && <div><div className={s.error_mark}>{meta.error}</div></div>}            
        </div>
    )
}

