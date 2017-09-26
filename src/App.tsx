import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './view/layout/Layout';
// import * as Action from './redux/actions/auth/AuthAction';
import * as State from './redux/state';

import './App.css';
import './assets/icomoon/style.css';

export function mapStateToProps(state: State.Root) {
    return {
        userName: state.auth.userName,
        portrait: state.auth.portrait,
        token: state.auth.token
    };
}

class App extends React.Component<{token: string} & RouteComponentProps<{}>> {
  render() {
  // tslint:disable-next-line:no-console
  console.log(this.props.match);
  // tslint:disable-next-line:no-console
  console.log(this.props.token);
  return (      
    <div className="container">
      <Layout {...this.props}/>
      </div>
    );
  }
}

export default connect<{}, {}, {}>(mapStateToProps)(withRouter(App));
