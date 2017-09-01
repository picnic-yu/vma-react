import * as React from 'react';
import './App.css';
import './assets/icomoon/style.css';
import Login from './view/Login';

// import Layout from './view/layout/Layout';

class App extends React.Component {
  render() {
    return (
      <div className="container">
        {/* <Layout/> */}
        <Login/>
      </div>
    );
  }
}

export default App;
