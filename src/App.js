import React, { useState, useEffect, useRef } from "react";

import './App.scss';

import CountUp from 'react-countup';



function App() {
  const [confirmed, setConfirmed] = useState(0)
  const [recovered, setRecovered] = useState(0)
  const [deaths, setDeaths] = useState(0)
  const [country, setCountry] = useState([])
  const numberOfIsraelCalls = useRef(0);
  const numberOfCountriesCalls = useRef(0);

    useEffect(() => {
      async function fetchData() {
        const dataCountries = await fetch("https://covid19.mathdro.id/api/countries")
        .then(res => res.json());
        const newCountry = Object.keys(dataCountries.countries)
        .map((i => dataCountries.countries[i].name));
        setCountry(newCountry)
        console.log("Number of countries renders: " + numberOfCountriesCalls.current++);

      }
      fetchData();
    }, [])

  function renderCountryOption(){
    return country.map((place, i) =>{
      return <option key={i}>{place}</option>
    })
  }

  async function getCountryData(e){
    try{
      const countryData = await fetch(`https://covid19.mathdro.id/api/countries/${e.target.value}`)
        .then(res => res.json());
        console.log(countryData.confirmed.value)
        setConfirmed(countryData.confirmed.value)
        setRecovered(countryData.recovered.value)
        setDeaths(countryData.deaths.value)
      }
    catch (err) {

      }
  }


  return (
    <div className="container">
      <div className="header">
        <h2>CoronaVirus Data</h2>
      </div>
      <div>
        <select className="dropdown" onChange={getCountryData} >
        {renderCountryOption()}
        </select>
      </div>
      <div className="dataNumbers">
        <span className="item">
          <h3 className="title">Confirmed</h3>
          <CountUp start={0} end={confirmed} duration={2.75} useEasing={true}/>
        </span>
        <span className="item second">
          <h3 className="title">Recovered</h3>
          <CountUp start={0} end={recovered} />
        </span>
        <span className="item third">
        <h3 className="title">Deaths</h3>
        <CountUp start={0} end={deaths} />
        </span>
      </div>
   </div>
  );
}

export default App;
