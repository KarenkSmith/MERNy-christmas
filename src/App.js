import React, { Component } from 'react';
import './App.scss';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Snow from '../public/snow'
import userService from './utils/userService';

import XmasList from "./components/xmas-list.component";
import EditGift from "./components/edit-gift.component";
import CreateGift from "./components/create-gift.component";
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import NavBar from './components/navbar';

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null
    };
  }


  handleLogout = () => {
    userService.logout();
    this.setState({ user: null });
  }

  handleSignupOrLogin = () => {
    this.setState({ user: userService.getUser() });
  }

  /*--- Lifecycle Methods ---*/

  async componentDidMount() {
    const user = userService.getUser();
    this.setState({ user });
  }

  render() {

    return (

      // <Router>
      <div>       
        <div className="container">
   
          <nav className="navbar navbar-expand-lg">
        

            <Link to="/" className="navbar-brand">MERNy Christmas</Link>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/list" className="nav-link">Xmas List</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/create" className="nav-link">Add Gifts</Link>

                </li>
                <NavBar 
                  user={this.state.user}
                  handleLogout={this.handleLogout}
                />
              </ul>

            </div>

          </nav>
          

          <Route path="/list" component={XmasList} user={this.state.user} />
          <Route path="/edit/:id" component={EditGift} />
          <Route path="/create" component={CreateGift} user={this.state.user} />

          <Route exact path='/signup' render={({ history }) => 
            <SignupPage
              history={history}
              handleSignupOrLogin={this.handleSignupOrLogin}
            />
          }/>
          <Route exact path='/login' render={({ history }) => 
            <LoginPage
              history={history}
              handleSignupOrLogin={this.handleSignupOrLogin}
            />
          }/>
          <Route exact path='/' render={({ history }) => 
            <p>Twas the night before project 4 and all through General Assembly</p>
          }/>
{/* 
          <Route path="/signup" component={SignupPage} handleSignupOrLogin={this.handleSignupOrLogin} />
          <Route path="/login" component={LoginPage} handleSignupOrLogin={this.handleSignupOrLogin} /> */}
        </div>
      </div>

      // </Router>
    );
  }
}


export default App;
