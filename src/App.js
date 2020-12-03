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
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/dashbord">Dashbord</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path="/dashbord">
              <CountryData />
            </Route>
            <Route path="/">
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
