import React, { useState, useEffect, useRef } from "react";

import CountUp from 'react-countup';
import Switch from './Switch';


function CountryData() {
  const [confirmed, setConfirmed] = useState(0)
  const [recovered, setRecovered] = useState(0)
  const [deaths, setDeaths] = useState(0)

  const [worldConfirmed, setWorldConfirmed] = useState(0)
  const [worldDeaths, setWorldeaths] = useState(0)
  const [worldRecovereed, setWorldRecovered] = useState(0)

  const [country, setCountry] = useState([])
  const [currentCountry, setCurrentCountry] = useState("");

  const numberOfCountriesCalls = useRef(0);
  var countryMap;

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
    }, [currentCountry])

  function renderCountryOption(){
    return country.map((place, i) =>{
      return <option key={i}>{place}</option>
    })
  }

  useEffect(() => {
    async function fetchData() {
      const worldWideData = await fetch("https://covid19.mathdro.id/api")
      .then(res => res.json());
      setWorldConfirmed(worldWideData.confirmed.value)
      setWorldRecovered(worldWideData.recovered.value)
      setWorldeaths(worldWideData.deaths.value)

    }
    fetchData();
  }, [])


  async function getCountryData(e){
    try{
      countryMap = e.target.value;
      const countryData = await fetch(`https://covid19.mathdro.id/api/countries/${e.target.value}`)
        .then(res => res.json());
        setConfirmed(countryData.confirmed.value)
        setRecovered(countryData.recovered.value)
        setDeaths(countryData.deaths.value)
        setCurrentCountry(countryMap)
      }
    catch (err) {

      }
  }

  {var deathsPercentage = (({deaths} === 0) || ({recovered} === 0)) ? "No data confirmed" : (((deaths) / (confirmed)) * 100).toFixed(3)};

  return (

    <div className="container">
      <div className="main">
        <select className="dropdown" onChange={getCountryData} >
        {renderCountryOption()}
        </select>
      </div>
      <div className="mapAndNum">
        <div className="triple-items">
            <div className="item">
              <CountUp start={0} end={confirmed} useEasing={true} separator="," decimal={3, 6}/>
              <h3 className="title">Confirmed</h3>
            </div>
            <span className="item">
              <CountUp start={0} end={recovered} useEasing={true} separator="," decimal={3, 6}/>
              <h3 className="title">Recovered</h3>
            </span>
            <span className="item">
            <CountUp start={0} end={deaths} useEasing={true} separator="," decimal={3, 6}/>
            <h3 className="title">Deaths</h3>
            </span>
        </div>
        <div>
        <Switch mapCountry={currentCountry} deadPercentage={deathsPercentage} />
        </div>
        <div className="triple-items">
          <span className="item">
            <CountUp start={0} end={worldConfirmed}  useEasing={true} separator="," decimal={3, 6}/>
            <h3 className="title">Worldwide Confirmed</h3>
          </span>
            <span className="item">
            <CountUp start={0} end={worldRecovereed} useEasing={true} separator="," decimal={3, 6}/>
            <h3 className="title">Worldwide Recovered</h3>
          </span>
          <span className="item">
          <CountUp start={0} end={worldDeaths} useEasing={true} separator="," decimal={3, 6}/>
          <h3 className="title">Worldwide Deaths</h3>
          </span>
        </div>
      </div>
    </div>
  );
}

export default CountryData;
