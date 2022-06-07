import Profile from "./Profile";
import { avatarChangeThunkCreator,addLike, addPost, updatePost, profileThunkCreator, statusPostThunkCreator } from "../../redux/profile-reducer";
import { connect } from "react-redux";
import React from "react";
import { useParams } from "react-router-dom";
import { compose } from "redux";
import { withAuthRedirect } from '../../HOC/with-auth-redirect-HOC'

class ProfileClass extends React.Component {

  refreshProfile() {    
    if (!this.props.userId) {
      this.props.profileThunkCreator(this.props.id)
    } else { this.props.profileThunkCreator(this.props.userId)}
  }

  componentDidMount() {
    this.refreshProfile()
  }

  componentDidUpdate(prevProps) {         
    if (prevProps.userId != this.props.userId) {
      this.refreshProfile()
    }
  }

  render() {
    return <Profile {...this.props} />
  }
}

let stateToProps = (state) => {
  return {
    profilePage: state.profilePage,
    id: state.auth.id,
  }
}

const ProfileContainerWithRouter = (props) => {
  let Id = useParams().userID
  return <ProfileClass {...props} userId={Id} />
}

export default compose(connect(stateToProps, {
  addPost,
  updatePost,
  addLike,
  profileThunkCreator,
  statusPostThunkCreator,
  avatarChangeThunkCreator,
}), withAuthRedirect)
  (ProfileContainerWithRouter)




