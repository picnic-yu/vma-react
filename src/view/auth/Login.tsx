import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Input, FormItem } from '../../components/index';
import * as AuthAction from '../../redux/actions/auth/AuthAction';
// import IFormItemActions from '../../interfaces/IFormItemActions';

import { Root as AppState } from '../../redux/state';
import { AuthReqByAccount } from '../../redux/actions/auth/AuthAction';

import { connect, MapStateToPropsParam, MapDispatchToPropsParam } from 'react-redux';

interface ViewProps {
    token: string;
}
    
interface ViewHandle {
    loginByAccount: (req: AuthReqByAccount) => void;
}

const mapStateToPropsParam: MapStateToPropsParam<ViewProps, {}, {}> = (appState: AppState) => {
    return {
        token: appState.auth.token
    };
};

const mapDispatchToPropsParam: MapDispatchToPropsParam<ViewHandle, {}> = (dispatch) => {
    return {
        loginByAccount: (req: AuthReqByAccount) => dispatch(AuthAction.login(req)),
    };
};

class Login extends React.Component<ViewProps & ViewHandle> {
    state = {userName: '', password: '', disable: true};
    handleChange = (name: string, value: string|number) => {
        if (name.length !== 0) {
          let data = {};
          data[name] = value;
          this.setState(data, () => {
            if (this.state.userName.length !== 0 && this.state.password.length !== 0) {
                this.setState({disable: false});                
            } else {
                this.setState({disable: true});
            }
          });
        }
    }

    handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        // e.preventDefault();
        let authRequest: AuthAction.AuthReqByAccount = {userName: this.state.userName, password: this.state.password};
        this.props.loginByAccount(authRequest);
    }

    render() {
        const token = this.props.token || '';
        if (token.length > 0) {
            return (
                <Redirect to="/"/>
            );
        }
        return (
            <div className="col-offset-12 col-6" style={{marginTop: '10%'}}>
                <FormItem label="用户名" required={true}>
                    <Input 
                        type="text" 
                        name="userName" 
                        minLength={6}
                        value={this.state.userName} 
                        watchValue={this.handleChange}
                    />
                </FormItem>
                <FormItem label="密码" required={true}>
                    <Input 
                        type="password" 
                        name="password" 
                        minLength={4}
                        value={this.state.password} 
                        watchValue={this.handleChange}
                    />
                </FormItem>
                <FormItem>
                    <Button 
                        type="btn-primary" 
                        disabled={this.state.disable} 
                        onClick={this.handleClick}
                    >登录{this.props.token}
                    </Button>
                </FormItem>
            </div>
        );
    }    
}

export default connect<ViewProps, ViewHandle, {}>(mapStateToPropsParam, mapDispatchToPropsParam)(Login);