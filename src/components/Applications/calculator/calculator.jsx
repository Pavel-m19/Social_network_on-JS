import React from "react";
import s from "./calculator.module.scss"
import { useFormik } from "formik";
import p from '../../Profile/ProfileForm.module.css'
import BMI from "../../../assets/BMI.png"
import BMIarrow from "../../../assets/BMI_arrow.png"
import { useState } from "react";

let Calculator = () => {

    const [bmiAngle, setBmiAngle] = useState(0)
    const [bmi, setBmi] = useState(null)

    

    const validate = (values) => {
        const errors = {};
        const numChecker = (obj) => {
            if (!values[obj]) {
                errors[obj] = `Enter yor ${obj}`
            } else if (isNaN(Number(values[obj]))) {
                errors[obj] = `${obj} must be a number!`
            }
        }

        if (!values.sex) {
            errors.sex = 'Choose your sex'
        }
        numChecker("age")
        numChecker("weight")
        numChecker("height")
        return errors
    }

    const former = useFormik({
        initialValues: {
            sex: '',
        },
        validate,
        onSubmit: values => {
            bmiCalc(values)
        },
    });

    const bmiCalc = (values) => {
       
        let bmi = values.weight / Math.pow((values.height /100) , 2);

        if(bmi < 16){
            setBmiAngle((bmi/16) * 27)
        }else if(bmi >= 16 && bmi < 17){
            setBmiAngle(27 + (1 - (17-bmi)) * 30)
        }else if(bmi >= 17 && bmi < 18.5){
            setBmiAngle(58 + (1 - (18.5-bmi) / 1.5) * 30)
        }
        else if(bmi >= 18.5 && bmi < 25){
            setBmiAngle(90 + (1 - (25-bmi)/6.5) * 30)
        }else if(bmi >= 25 && bmi < 30){
            setBmiAngle(120 + (1 - (30-bmi)/5) * 30)
        }else if(bmi >= 30 && bmi < 35){
            setBmiAngle(151 + (1 - (35-bmi)/5) * 30)
        }else if(bmi >= 35 && bmi < 40){
            setBmiAngle(182 + (1 - (40-bmi)/5) * 30)
        }else if(bmi >= 40 && bmi < 45){
            setBmiAngle(212 + (1 - (45-bmi)/5) * 30)
        }else{setBmiAngle(245)}

        setBmi(bmi.toFixed(2))
    }

    return <div className={s.calculators__wrapper}>
        <form onSubmit={former.handleSubmit} className={s.data_input_wrapper}>
            <div className={s.user_info_wrapper}>
                <div className={s.sex_block}>
                    <div className={s.sex_block_elems_wrapper}>
                        <div className={s.sex_block_elem}>
                            <input
                                name="sex"
                                type="radio"
                                className={s.input_feild}
                                onChange={former.handleChange}
                                value="male"
                                onBlur={former.handleBlur}
                                id="male"
                            />
                            <label htmlFor="male" className={s.input_form_label}> Male </label>
                        </div>
                        <div className={s.sex_block_elem}>
                            <input
                                name="sex"
                                type="radio"
                                className={s.input_feild}
                                onChange={former.handleChange}
                                value="female"
                                onBlur={former.handleBlur}
                                id="female"
                            />
                            <label htmlFor="female" className={s.input_form_label}> Female </label>
                        </div>
                    </div>
                    <span>{former.errors.sex}</span>
                </div>

                <div className={s.info_feild}>
                    <label htmlFor="age" className={s.input_form_label}>Your age </label>
                    <input
                        autoComplete="off"
                        className={p.input_feild + ' ' + (former.errors.age && former.touched.age && p.error)}
                        onChange={former.handleChange}
                        value={former.values.age}
                        onBlur={former.handleBlur}
                        id="age"
                    />
                    {former.touched.age && <span>{former.errors.age}</span>}
                </div>

                <div className={s.info_feild}>
                    <label htmlFor="weight" className={s.input_form_label}> Your weight </label>
                    <input
                        autoComplete="off"
                        className={p.input_feild + ' ' + (former.errors.weight && former.touched.weight && p.error)}
                        onChange={former.handleChange}
                        value={former.values.weight}
                        onBlur={former.handleBlur}
                        id="weight"
                    />
                    {former.touched.weight && <span>{former.errors.weight}</span>}
                </div>

                <div className={s.info_feild}>
                    <label htmlFor="height" className={s.input_form_label}>Your height </label>
                    <input
                        autoComplete="off"
                        className={p.input_feild + ' ' + (former.errors.height && former.touched.height && p.error)}
                        onChange={former.handleChange}
                        value={former.values.height}
                        onBlur={former.handleBlur}
                        id="height"
                    />
                    {former.touched.height && <span>{former.errors.height}</span>}
                </div>

                <div className={s.buttons_wrapper}>
                    <button
                        type="submit"
                        disabled={!former.dirty ||
                            former.errors.sex ||
                            former.errors.weight ||
                            former.errors.height ||
                            former.errors.age}>
                        Calculate
                    </button>
                </div>
            </div>
        </form>

        <div className={s.cpfc_diagramm_wrapper}>
            <img src={BMI} alt="BMI" />
            <img src={BMIarrow} className={s.bmi_arrow} style={{ '--angle': `${bmiAngle}deg` }} alt="BMI" />
            <div className={s.bmi_value}>{bmi? `Your BMI: ${bmi}` : ''}</div>
        </div>
    </div>

}

export default Calculator