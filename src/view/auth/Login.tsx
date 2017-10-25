import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Input, FormItem } from '../../components/index';
import * as AuthAction from '../../redux/actions/auth/AuthAction';
// import IFormItemActions from '../../interfaces/IFormItemActions';

export default class Login extends React.Component<AuthAction.AuthResp & AuthAction.AccountDispatch> {
    state = {userName: '', password: '', disable: true};
    handleChange = (name: string, value: string|number) => {
        if (name.length !== 0) {
          let data = {};
          data[name] = value;
          this.setState(data, () => {
            // tslint:disable-next-line:no-console
            console.log(this.state);
            if (this.state.userName.length !== 0 && this.state.password.length !== 0) {
                this.setState({disable: false});                
            } else {
                this.setState({disable: true});
            }
          });
        }
    }

    handleClick = (e: MouseEvent) => {
        e.preventDefault();
        let authRequest: AuthAction.AuthReqByAccount = {userName: this.state.userName, password: this.state.password};
        this.props.accountLogin(authRequest);
    }

    render() {
        const token = this.props.token || '';
        // tslint:disable-next-line:no-console
        console.log('token:' + token);
        if (token.length > 0) {
            return (
                <Redirect to="/"/>
            );
        }
        return (
            <div className="col-offset-12 col-6" style={{marginTop: '10%'}}>
                <FormItem label="用户名">
                    <Input 
                        type="text" 
                        name="userName" 
                        value={this.state.userName} 
                    />
                </FormItem>
                <FormItem label="密码">
                    <Input 
                        type="password" 
                        name="password" 
                        value={this.state.password} 
                    />
                </FormItem>
                <div style={{marginLeft: 80}}>
                    <Button 
                        type="btn-primary" 
                        disabled={this.state.disable} 
                    >登录{this.props.token}
                    </Button>
                </div>
            </div>
        );
    }    
}