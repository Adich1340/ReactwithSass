import React from "react";
import './App.scss';

import CountryData from './Components/CountryData';
import Footer from './Components/Footer';



function App() {
  return (
    <React.Fragment>
        <CountryData />
        <Footer />
    </React.Fragment>
  )
}

export default App;
