import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './view/layout/Layout';
import * as State from './redux/State';

import './App.css';
import './assets/icomoon/style.css';

export function mapStateToProps(state: State.User) {
    return {
        userName: state.name,
        icon: state.icon,
        token: state.token
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
      <Layout/>
      </div>
    );
  }
}

export default connect<{}, {}, {}>(mapStateToProps)(withRouter(App));
