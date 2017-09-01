import { connect, Dispatch } from 'react-redux'
// import { Dispatch } from 'react-redux'
import * as Action from '../redux/Action';
import * as State from '../redux/State';
import { Login, LoginProp } from '../view/Login';

export function mapStateToProps(state: State.User) {
    return {
        userName: state.name,
        icon: state.icon,
        token: state.token
    }
}

export function mapDispatchToProps(dispatch: Dispatch<Action.UserAction>) {
    return {
        // userLogin: (name: string, icon: string, token: string) => dispatch({type: Action.LOGIN, state: {name: name, icon: icon, token: token}})
        userLogin: (loginResult: State.User) => dispatch(Action.userLogin(loginResult))
    }
}

export default connect<{}, {}, LoginProp>( mapDispatchToProps)(Login);