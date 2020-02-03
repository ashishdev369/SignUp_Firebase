import React from 'react';
import fire from './config/fire'
import Home from './component/users/Home';
import './App.css';
import Login from './component/Login/login'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };

    this.authListener = this.authListener.bind(this);
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    console.log(fire);
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      } else {
        this.setState({ user: null });
      }
    })
  }
  render() {
    return (
      <div>
        { this.state.user ? ( <Home user={this.state.user}/> ) : ( <Login /> ) }
      </div>
    );
  }
}

export default App;
