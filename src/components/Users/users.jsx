import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import s from './users.module.css'
import userAva from '../../assets/user_ava.png'
import dotsLoader from '../../assets/button_loading.gif'
import '../../assets/main-style.css';
import { useState } from "react";
import topArrow from '../../assets/top-arrow.png'
import Preloader from "../Common/preloader";
import { useRef } from "react";

import { useFormik } from "formik";

let Users = (props) => {

    let [currentPage, setCurrentPage] = useState(props.usersPage.currentPage)
    let [scrolled, setScroled] = useState(false)
    let [numbersCount, setNumbersCount] = useState(3)

    let mainElement = useRef(null)

    let pageCounter = () => {
        let pageNumbers = [];
        let pageCount = Math.ceil(props.usersPage.totalUsersCount / props.usersPage.pageSize)
        for (let i = Math.max(2, (props.usersPage.currentPage - numbersCount));
            i <= Math.min((props.usersPage.currentPage + numbersCount),
                pageCount - 1); i++) { pageNumbers.push(i) }
        return pageNumbers
    }

    let scrollHandler = (e) => {
        if ((e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100)
            && !props.usersPage.scrollIsFetching) {
            if (Math.ceil(props.usersPage.totalUsersCount / props.usersPage.pageSize) > currentPage) {
                props.getUsersScrollThunkCreator(props.usersPage.term, currentPage, props.usersPage.pageSize);
                setCurrentPage(currentPage + 1)
            }
        }
        if ((e.target.documentElement.scrollTop < 5) && !props.usersPage.isFetching) {
            props.scrollUsersDelete()
            setCurrentPage(props.usersPage.currentPage)
        }

        if ((e.target.documentElement.scrollTop > 100)) {
            setScroled(true)
        } else { setScroled(false) }
    }

    let srollToTop = (e) => {
        window.scrollTo(0, 0)
    }

    let chooseUsersPerPage = (count) => {
        props.setTerm('')
        props.setUsersPerPage(count, 1)
        props.getUsersThunkCreator(props.usersPage.term, props.usersPage.currentPage, count)
    }

    let pageCounterCalc = () => {
        if (mainElement.current != null) {
            let newPageCount = Math.floor((mainElement.current.clientWidth - 100) / 43 / 2 - 1)
            if (newPageCount !== numbersCount) { setNumbersCount(newPageCount) }
        }
    }

    useEffect(pageCounterCalc)

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler)
        return () => {
            document.removeEventListener('scroll', scrollHandler)
        }
    })

    useEffect(() => {
        window.addEventListener('resize', pageCounterCalc)
        return () => {
            window.removeEventListener('resize', pageCounterCalc)
        }
    })

    return (
        <div ref={mainElement}>
            <div>
                {scrolled &&
                    <img onClick={srollToTop}
                        className={s.top__arrow}
                        src={topArrow}
                        alt='go to top' />}
            </div>
            <Paginator {...props} chooseUsersPerPage={chooseUsersPerPage} />
            <div className={s.page_list}>

                <span className={1 === props.usersPage.currentPage ? s.selectedPage : s.page + ' ' + s.f_l_page}
                    onClick={() => { props.onPageChanged(1) }}>
                    FIRST</span>

                <div>
                    {pageCounter().map((p) =>
                    (<span className={p === props.usersPage.currentPage ? s.selectedPage : s.page}
                        onClick={() => { props.onPageChanged(p) }}>{p}</span>)
                    )}
                </div>

                <span className={Math.ceil(props.usersPage.totalUsersCount / props.usersPage.pageSize) === props.usersPage.currentPage ? s.selectedPage : s.page + ' ' + s.f_l_page}
                    onClick={() => { props.onPageChanged(Math.ceil(props.usersPage.totalUsersCount / props.usersPage.pageSize)) }}>
                    LAST</span>

            </div>

            <div className={s.users_wrapper}>
                {props.usersPage.users.map((user) =>
                (<div className={user.followed ? s.user_card : (s.user_card + ' ' + s.folowed)} key={user.id}>

                    <div className={s.user_card__avatar__block}>
                        <NavLink to={'/Profile/' + user.id} >
                            <img className={s.user_card__avatar} src={user.photos.small == null ? userAva : user.photos.small} alt='ava' />
                        </NavLink>
                        {props.isAuth ? (!user.followed ?
                            <button disabled={props.usersPage.subscribeFetching.some(id => id === user.id)}
                                onClick={() => { props.subscriberThunkCreator("POST", user) }}
                                className={s.no_followed_button}
                                key={user.id}> {props.usersPage.subscribeFetching.some(id => id === user.id) ?
                                    <img className={s.loading_button} src={dotsLoader} alt='loading' /> : "Subscribe"} </button>

                            :

                            <button disabled={props.usersPage.subscribeFetching.some(id => id === user.id)}
                                onClick={() => { props.subscriberThunkCreator("DELETE", user) }}
                                className={s.followed_button}
                                key={user.id}> {props.usersPage.subscribeFetching.some(id => id === user.id) ?
                                    <img className={s.loading_button} src={dotsLoader} alt='loading' /> : 'Unsubscribe'} </button>) :

                            <NavLink to={`/Login`}><button
                                className={s.no_followed_button}
                                key={user.id}>LOGIN!</button></NavLink>
                        }
                    </div>

                    <div className={s.user_card__name}>{user.name}</div>

                    <div className={s.user_card__info}>
                        {user.status && <div><span>{user.status}</span></div>}
                        <div><button>Chating</button></div>
                    </div>

                </div>)

                )}
                <Preloader fetch={props.usersPage.scrollIsFetching} />
            </div>
        </div>
    )

}

const Paginator = (props) => {

    const searcher = (term) => {
        props.setTerm(term)
        props.pageSelect(1)
        props.getUsersThunkCreator(term, 1, props.usersPage.pageSize)
    }

    const validate = (values) => {
        const errors = {}

        if (!values.term) {
            errors.term = 'Reqired'
        }
        return errors
    }

    const former = useFormik({
        initialValues: {
            term: ''
        }, validate,
        onSubmit: values => {
            searcher(values.term);
        },
    });

    const clearTerm = () => {
        props.setTerm('')
        former.resetForm()
        props.getUsersThunkCreator('', 1, props.usersPage.pageSize)
    }

    return <div className={s.paginator_custumizer}>
        <form onSubmit={former.handleSubmit} className={s.search_block}>
            <label htmlFor="term" className={s.input_form_label}> Find users </label>
            <input
                className={s.input_feild}
                onChange={former.handleChange}
                value={former.values.term}
                onBlur={former.handleBlur}
                id="term" />
            {props.usersPage.term ? <button
                type="reset"
                onClick={clearTerm}
                className={s.search_clear_button}>
                X
            </button> : ''}
            <button type="submit" disabled={!former.dirty}>search</button>

        </form>
        <div className={s.choose_count}>
            <span><b>Users per page:</b></span>
            <ul className={s.per__page__count_list}>
                <li><span>{props.usersPage.pageSize}</span>
                    <ul className={s.per__page__count_list_item}>
                        <li onClick={() => { props.chooseUsersPerPage(5) }}>5</li>
                        <li onClick={() => { props.chooseUsersPerPage(10) }}>10</li>
                        <li onClick={() => { props.chooseUsersPerPage(20) }}>20</li>
                    </ul>
                </li>
            </ul>

        </div>
    </div>
}

export default Users

