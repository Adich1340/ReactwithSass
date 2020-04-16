import React from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import CountryData from './Components/CountryData';
import Footer from './Components/Footer';
import About from './Components/About.js';

import './Styles/App.scss';

function App() {
  return (
    <div>
      <Router>
        <div className="sideBar">
          <nav>
            <ul>
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path="/home">
              <CountryData />
            </Route>
            <Route path="/about">
              <About />
            </Route>
          </Switch>
        </div>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
