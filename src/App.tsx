import * as React from 'react';
import { Route } from 'react-router-dom';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';
import './assets/icomoon/style.css';
// import Login from './view/Login';
import Login from './containers/Login';
import Layout from './view/layout/Layout';
import * as State from './redux/State';

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
      <Route 
          path="/"
          render={() => (
            this.props.token.length > 0 ? (
              <Layout/>
            ) : (
            <Login/>
            )
          )}
      />
      </div>
    );
  }
}

export default connect<{}, {}, {}>(mapStateToProps)(withRouter(App));
