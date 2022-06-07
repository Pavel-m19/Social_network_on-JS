import React from "react";
import s from './Profile.module.css'
import dotsLoader from '../../assets/button_loading.gif'

class ProfileStatus extends React.Component {

    state = {
        editMode: false,
        status: this.props.profilePage.status
    }

    statusArea = React.createRef()

    editModeToggle() {
        if (this.props.profilePage.currentId != this.props.id) {
            return
        }
        if (!this.state.editMode) {
            this.setState({ editMode: !this.state.editMode })
        } else {
            this.setState({ status: this.statusArea.current.value })
            this.setState({ editMode: !this.state.editMode });
            this.props.statusPostThunkCreator(this.state.status);
        }
    };

    onStatusChange() {
        this.setState({ status: this.statusArea.current.value })
    }



    render() {
        return (
            <>
                {!this.state.editMode &&
                    <div className={s.postHeader}>
                        {!this.props.profilePage.statusFetch &&
                            <span onClick={this.editModeToggle.bind(this)}>
                                {this.props.profilePage.status ? this.props.profilePage.status : 'Input status'}
                            </span>}
                        {this.props.profilePage.statusFetch &&
                            <img className={s.loading} src={dotsLoader} alt='loading' />}
                    </div>}
                {/* //ELSE */}
                {this.state.editMode && <div>
                    <input autoFocus={true}
                        onBlur={this.editModeToggle.bind(this)}
                        value={this.state.status}
                        ref={this.statusArea}
                        onChange={this.onStatusChange.bind(this)} />
                </div>}
            </>
        )
    }
}

export default ProfileStatus