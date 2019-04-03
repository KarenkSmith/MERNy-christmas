import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import XmasList from "./components/xmas-list.component";
import EditGift from "./components/edit-gift.component";
import CreateGift from "./components/create-gift.component";

class App extends Component {
  render() {
    return (
      <Router>
      <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to="/" className="navbar-brand">MERNy Christmas</Link>
        <div className="collapse navbar-collapse">
        <ul className="navbar-nav mr-auto">
        <li className="navbar-item">
          <Link to="/" className="nav-link">Xmas List</Link>
          </li>
          <li className="navbar-item">
            <Link to="/create" className="nav-link">Add Gifts</Link>
          </li>
        </ul>
        </div>
      </nav>

      <Route path="/" exact component={XmasList} />
      <Route path="/edit/:id" component={EditGift} />
      <Route path="/create" component={CreateGift} />
      </div>
      </Router>
    );
  }
}

export default App;
