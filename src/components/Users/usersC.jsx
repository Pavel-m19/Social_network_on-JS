import React from "react";
import s from './users.module.css'
import * as axios from "axios";
import userAva from '../../assets/user_ava.png'

class Users extends React.Component {   

    componentDidMount() {

        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.usersPage.currentPage}&count=${this.props.usersPage.pageSize}`).then(response => {
            this.props.setUsers(response.data.items)
            console.log(response.data.totalCount)
            this.props.setUsersNumbers(response.data.totalCount)
        })
    }


    render() {
        return (
            <div>
                <div className={s.page_list}>

                    <span className={s.page}
                        onClick={() => { this.onPageChanged(1) }}>
                        FIRST</span>

                    {this.pageCounter().map((p) =>
                    (<span className={p === this.props.usersPage.currentPage ? s.selectedPage : s.page}
                        onClick={() => { this.onPageChanged(p) }}>{p}</span>)
                    )}

                    <span className={s.page}
                        onClick={() => { this.onPageChanged(Math.ceil(this.props.usersPage.totalUsersCount / this.props.usersPage.pageSize)) }}>
                        LAST</span>

                </div>
                <div className={s.users_wrapper}>
                    {this.props.usersPage.users.map((user) =>
                    (<div className={user.followed ? s.user_card : (s.user_card + ' ' + s.folowed)} key={user.id}>
                        <div className={s.user_card__avatar__block}>
                            <img className={s.user_card__avatar} src={user.photos.small == null ? userAva : user.photos.small} alt='ava' />
                            <button onClick={() => { this.props.follow(user.id) }} className={user.followed ? s.followed_button : s.no_followed_button}
                                key={user.id}> {user.followed ? 'Unsubscribe' : "Subscribe"} </button>
                        </div>
                        <div className={s.user_card__name}>{user.name}</div>
                        <div className={s.user_card__info}>
                            <div>{"user.type.animal"}</div>
                            <div>{"user.type.breed"}</div>
                        </div>
                    </div>)
                    )}
                </div>
            </div>
        )
    }

    pageCounter() {
        let pageNumbers = [];
        let pageCount = Math.ceil(this.props.usersPage.totalUsersCount / this.props.usersPage.pageSize)
        for (let i = Math.max(1, (this.props.usersPage.currentPage - 15)); i <= Math.min(Math.max((this.props.usersPage.currentPage + 10), 35), pageCount); i++) {

            pageNumbers.push(i)
        }
        return pageNumbers
    }

    onPageChanged = (pageNumber) => {

        this.props.pageSelect(pageNumber);

        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.usersPage.pageSize}`).then(response => {
            this.props.setUsers(response.data.items)
            this.props.setUsersNumbers(response.data.totalCount)
        })       
    }
}

export default Users