import { connect, Dispatch } from 'react-redux';
import * as Action from '../redux/Action';
import * as State from '../redux/State';
import { Login, LoginProp } from '../view/Login';

export function mapStateToProps(state: State.User) {
    return {
        userName: state.name,
        icon: state.icon,
        token: state.token
    };
}

export function mapDispatchToProps(dispatch: Dispatch<Action.UserAction>) {
    return {
        userLogin: (loginResult: State.User) => dispatch(Action.userLogin(loginResult)),
    };
}

export default connect<{}, {}, LoginProp>(mapStateToProps, mapDispatchToProps)(Login);
