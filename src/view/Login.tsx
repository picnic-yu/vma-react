import * as React from 'react';
import Button from '../components/Button';
// import ButtonGroup from '../components/ButtonGroup';
import Input from '../components/Input';
// import * as Remote from '../remote/Remote';
import * as State from '../redux/State';
// import * as Action from '../redux/Action';

export interface LoginProp {
    userName?: string;
    icon?: string;
    token?: string;
    userLogin?: (user: State.User) => void;
    // userLogin?: () => Action.UserAction;
}
interface LoginState {
    userName: string;
    password: string;
    disable: boolean;
}

export class Login extends React.Component<LoginProp, LoginState> {
    state: LoginState = { userName: '', password: '', disable: true};
    constructor(prop: LoginProp) {
        super(prop);
    }

    handleChange = (name: string, value: string|number) => {
        // tslint:disable-next-line:no-console
        console.log(name + ':' + value);
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
        // tslint:disable-next-line:no-console
        console.log('handleChange:' + e.type);
        if (this.props.userLogin) {
            // tslint:disable-next-line:no-console
            console.log('call before action');
            let result: State.User = { name: 'lixf', icon: 'test', token: 'xxxxx' };
            this.props.userLogin(result);
            // tslint:disable-next-line:no-console
            console.log('call after action');
        }
        // Remote.login(this.state.userName, this.state.password).then((data) => {
        //     // tslint:disable-next-line:no-console
        //     console.log(data);
        //     // let name = data.data.name;
        //     // let icon = data.data.icon;
        //     // let token =  data.data.token;
        //     // console.log(name);
        //     // console.log(icon);
        //     // console.log(token);
        //     let loginResult: State.User = data.data;
            
        //     if (this.props.userLogin) {
        //         // this.props.userLogin({name , icon, token});
        //         this.props.userLogin(loginResult);
        //     }
        // });
    }
    render() {
        return (
            <div className="col-offset-12 col-6" style={{marginTop: '10%'}}>
                <Input 
                    type="text" 
                    prompt="用户名" 
                    name="userName" 
                    value={this.state.userName} 
                    handler={this.handleChange}
                />
                <Input 
                    type="password" 
                    prompt="密码" 
                    name="password" 
                    value={this.state.password} 
                    handler={this.handleChange}
                />
                <div style={{marginLeft: 80}}>
                    <Button 
                        type="btn-primary" 
                        disabled={this.state.disable} 
                        handler={this.handleClick}
                    >登录{this.props.token}
                    </Button>
                </div>
            </div>
        );
    }
}

// export {Login, LoginProp} ;