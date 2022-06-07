import { connect } from "react-redux";
import { postNewMassage, updateMassageText } from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {withAuthRedirect} from '../../HOC/with-auth-redirect-HOC'
import { compose } from 'redux'


let stateToProps = (state) => ({dialogs: state.dialogPage })

export default compose(
    connect(stateToProps, {postNewMassage, updateMassageText}),
    withAuthRedirect
    )(Dialogs);
