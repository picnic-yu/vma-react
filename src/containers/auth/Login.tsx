import { connect, Dispatch } from 'react-redux';
import * as Action from '../../redux/actions/auth/AuthAction';
import Login from '../../view/auth/Login';

export function mapStateToProps(state: Action.AuthResponse) {
    console.log('mapStateToProps:' + JSON.stringify(state));
    return state;
}

export function mapDispatchToProps(dispatch: Dispatch<Action.AuthAction>) {
    return {
        accountLogin: (request: Action.AuthRequest) => dispatch(Action.accountLogin(request)),
    };
}

export default connect<{}, {}, Action.AuthResponse>(mapStateToProps, mapDispatchToProps)(Login);
