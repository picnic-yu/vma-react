import * as React from 'react';
import { Root as AppState } from '../redux/state';
import { login } from '../redux/thunk/auth';
import { AuthReqByAccount } from '../redux/actions/auth/AuthAction';

import { connect, MapStateToPropsParam, MapDispatchToPropsParam } from 'react-redux';

interface ViewProps {

}

interface ViewHandle {
    login: (req: AuthReqByAccount) => void;
}

const mapStateToPropsParam: MapStateToPropsParam<ViewProps, {}> = (appState: AppState) => {
    return {};
};

const mapDispatchToPropsParam: MapDispatchToPropsParam<ViewHandle, {}> = (dispatch) => {
    return {
        login: (req: AuthReqByAccount) => dispatch(login(req)),
        token: (token: string) => dispatch({type: ''})
    };
};

export class View extends React.Component<ViewProps & ViewHandle> {
    onClick = () => {
        this.props.login({userName: 'lixf', password: 'pwd'});
    }

    render() {
        return (
            <div onClick={this.onClick}>点击我演示redux-thunk</div>
        );
    }
}

export default connect<ViewProps, ViewHandle, {}>(mapStateToPropsParam, mapDispatchToPropsParam)(View);