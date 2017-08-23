import * as React from 'react';
import './App.css';
import './assets/icomoon/style.css';

import Layout from './view/layout/Layout';

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <Layout/>
      </div>
    );
  }
}

export default App;
