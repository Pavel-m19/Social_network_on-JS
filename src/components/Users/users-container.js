import React from "react";
import { connect } from "react-redux";
import Users from "./users"
import Preloader from "../Common/preloader";
import {getUsersAPI} from '../../API/api'
import {  setTerm, setUsersPerPage, scrollUsersDelete, getUsersScrollThunkCreator, subscriberThunkCreator,  setUsers, usersCount, fetchStatus, pageSelect, getUsersThunkCreator } from "../../redux/users-reducer"

class UsersClass extends React.Component {

  componentDidMount() {
    this.props.setTerm('')
    this.props.getUsersThunkCreator('', this.props.usersPage.currentPage, this.props.usersPage.pageSize)    
  }

  render() {
    return <>
      <Users {...this.props} onPageChanged={this.onPageChanged} />
      <Preloader fetch={this.props.usersPage.isFetching} />
    </>
  }

  onPageChanged = (pageNumber) => {
    this.props.pageSelect(pageNumber);
    this.props.fetchStatus(true);
    this.props.setUsers([]);

    getUsersAPI(this.props.usersPage.term, pageNumber, this.props.usersPage.pageSize).then(resp => {        
        this.props.fetchStatus(false);
        this.props.setUsers(resp.items)
        this.props.usersCount(resp.totalCount)
      })
  }
}

let stateToProps = (state) => {
  return {
    usersPage: state.usersPage,
    isAuth: state.auth.isAuth
  };
};



const UsersContainer = connect(stateToProps, {
  setUsers,
  usersCount,
  fetchStatus,
  pageSelect,  
  getUsersThunkCreator,
  subscriberThunkCreator,
  getUsersScrollThunkCreator,
  scrollUsersDelete,  
  setUsersPerPage,
  setTerm,
})(UsersClass);


export default UsersContainer;