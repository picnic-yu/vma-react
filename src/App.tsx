import * as React from 'react';
import './App.css';
import './assets/icomoon/style.css';
// import Login from './view/Login';
import Login from './containers/Login';
// import Hello from './components/Hello';


// import Layout from './view/layout/Layout';

class App extends React.Component {
  render() {
    return (
      <div className="container">
        {/* <Layout/> */}
        {/* <Hello enthusiasmLevel={10} name="TypeScript"/> */}
        <Login/>
      </div>
    );
  }
}

export default App;
