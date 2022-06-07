import React from "react";
import p from './Posts.module.css'

const Posts = (props) => {

    let likesButton = React.createRef();

    let addLike = () => { //лайк записи        
        props.liker(props.data.id)
      };
    
    return <div>
        <div className={p.item}>
            <div className={p.item__content}>
                <img className={p.ava} src={props.data.avatar} alt='ava' />
                <div className={p.item__inner__text}>{props.data.text}</div>
            </div>
            <div className={p.item__likes} >
                <img className={p.heart} src={props.data.likeLogo} ref={likesButton} onClick={addLike} alt='like'/> 
                <span>{props.data.likeList.length - 1}</span>
            </div>
        </div>

    </div>
}

export default Posts