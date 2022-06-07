import React from "react";
import s from './preloader.module.css'
import loader from '../../assets/BeanEater.gif'

let Preloader = (props) => {
     return <div  className={s.loader}>
    {props.fetch ? <img src={loader} alt="loading" /> : null}
  </div>
}

export default Preloader