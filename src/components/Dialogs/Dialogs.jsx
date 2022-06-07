import React from "react";
import { NavLink } from "react-router-dom";
import s from './Dialogs.module.css'



const chatBlock = React.createRef(null);
const newMassage = React.createRef();

const DialogName = (props) => {        
    return <div className={s.item}>
        <NavLink to={'/Dialog/' + props.state.id} className={navData => navData.isActive ? s.activeLink : s.item}>{props.state.name}</NavLink>
    </div>
}

let Dialogs = (props) => {
    let dialogElement = props.dialogs.dialogUserList.map((el) => <DialogName state={el} key={el.id} />)

    let massageElement = props.dialogs.dialogContent.map((el) => {
        if (el.id === "my") {
            return <div className={s.massager__massage_wrapper} key={el.id}><span className={s.massager__massage} key={el.id}>{el.massage}</span></div>
        } else {
            return <div className={`${s.massager__massage_wrapper} ${s.comp}`} key={el.id}><span className={`${s.massager__massage} ${s.m_comp}`}>{el.massage}</span></div>
        }
    })

    document.addEventListener('keypress', event => {

        if (event.code === 'Enter') {
            event.preventDefault();
            onSendMyMassage()
        }
        if (event.code === 'NumpadEnter') {
            event.preventDefault();
            onSendYouMassage()
        }
    })

    const onSendMyMassage = () => {
        props.postNewMassage('my')
        setTimeout(() => { scrollToMyRef(); }, 10);
    };
    
    const onSendYouMassage = () => {
        props.postNewMassage()
        setTimeout(() => { scrollToMyRef(); }, 10);
    };
    
    const scrollToMyRef = () => {
        if (chatBlock.current != null) {
            chatBlock.current.scrollTo(0, chatBlock.current.scrollHeight)
        }
    };
    
    const onMassageTextChange = () => {    
        let text = newMassage.current.value;
        props.updateMassageText(text)
    }
    
    return (
        <div className={s.wrapper}>
            <div className={s.dialogsList}>
                {dialogElement}
            </div>
            <div className={s.massager}>
                <div className={s.massager__chat} ref={chatBlock}>
                    {massageElement}
                </div>

                <div className={s.massager__input}>
                    <div>
                        <textarea onChange={onMassageTextChange} ref={newMassage} value={props.dialogs.newMassageText}></textarea>
                    </div>
                    <div>
                        <button onClick={onSendMyMassage}>send my</button>
                        <button onClick={onSendYouMassage}>send you</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Dialogs

