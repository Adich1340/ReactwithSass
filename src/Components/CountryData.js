import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';

import CountUp from 'react-countup';
import LeafletMap from './LeafletMap';
import RecoveredChart from './RecoveredChart';


function CountryData() {
  const [confirmed, setConfirmed] = useState(0)
  const [recovered, setRecovered] = useState(0)
  const [deaths, setDeaths] = useState(0)
  const [dailyCountryRecovered, setDailyCountryRecovered] = useState([])
  const [date, setDate] = useState([])

  const [worldConfirmed, setWorldConfirmed] = useState(0)
  const [worldDeaths, setWorldeaths] = useState(0)
  const [worldRecovereed, setWorldRecovered] = useState(0)

  const [countriesList, setCountryList] = useState([])
  const [currentCountry, setCurrentCountry] = useState("israel");

    useEffect(() => {
      (async () =>{
        const result = await axios(
        'https://covid19.mathdro.id/api/countries',
      );
      console.log("this is result.data : ", result.data)
      const countriesList =  Object.keys(result.data.countries).map(country => result.data.countries[country].name);
      console.log("this is countriesList : ", countriesList)

      setCountryList(countriesList);
      })();
    }, []);


    function renderCountryOption(){
      return countriesList.map((place, i) =>{
        return <option key={i} value={place}>{place}</option>
      })
    }


    useEffect(() => {
      (async () => {
        const worldwideData = await axios(
          'https://covid19.mathdro.id/api',
        );
        setWorldConfirmed(worldwideData.data.confirmed.value)
        setWorldRecovered(worldwideData.data.recovered.value)
        setWorldeaths(worldwideData.data.deaths.value)  
      })();
    }, []);


    useEffect(() => {
      (async () => {
        const currentCountryData = await axios(
          `https://covid19.mathdro.id/api/countries/${currentCountry}`,
        );

        setConfirmed(currentCountryData.data.confirmed.value)
        setRecovered(currentCountryData.data.recovered.value)
        setDeaths(currentCountryData.data.deaths.value)  
        })();


        (async () => {
          const currentCountryDataByDay = await axios(
            `https://api.covid19api.com/country/${currentCountry}`,
          );
  
          const recoveredByDay =  Object.keys(currentCountryDataByDay.data).map(day => currentCountryDataByDay.data[day].Recovered);
          const datesList = Object.keys(currentCountryDataByDay.data).map((date => currentCountryDataByDay.data[date].Date));


          const concatRecovered = dailyCountryRecovered.concat(recoveredByDay)
          const concatDates = date.concat(datesList)

          setDailyCountryRecovered(concatRecovered)
          setDate(concatDates)
        })();
    }, [currentCountry])
  
  var deathsPercentage = (({deaths} === 0) || ({recovered} === 0)) ? "No data confirmed" : (((deaths) / (confirmed)) * 100).toFixed(3);
  var countryToUpperCase = currentCountry.charAt(0).toUpperCase() + currentCountry.slice(1)

  return (
    <div className="container">
      <div className="main">
        <select className="dropdown" onChange={event => setCurrentCountry(event.target.value)} >
        {renderCountryOption()}
        </select>
      </div>
      <div className="mapAndNum">
        <div className="triple-items">
            <span className="item">
              <CountUp start={0} end={confirmed} useEasing={true} separator=',' decimal={'3', '6'}/>
              <p className="title">{countryToUpperCase} Confirmed</p>
            </span>
            <span className="item">
              <CountUp start={0} end={recovered} useEasing={true} separator=',' decimal={'3', '6'}/>
              <p className="title">{countryToUpperCase} Recovered</p>
            </span>
            <span className="item">
              <CountUp start={0} end={deaths} useEasing={true} separator=',' decimal={'3', '6'}/>
              <p className="title">{countryToUpperCase} Deaths</p>
            </span>
        </div>
        <div className="triple-items">
          <span className="item">
            <CountUp start={0} end={worldConfirmed}  useEasing={true} separator=',' decimal={'3', '6'}/>
            <p className="title">Worldwide Confirmed</p>
            <p>{(( confirmed / worldConfirmed ) * 100).toFixed(2)}%</p>
            <p>from Worldwide Confirmed</p>
          </span>
            <span className="item">
            <CountUp start={0} end={worldRecovereed} useEasing={true} separator=',' decimal={'3', '6'}/>
            <p className="title">Worldwide Recovered</p>
            <p>{(( recovered / worldRecovereed ) * 100).toFixed(2)}%</p>
            <p>from Worldwide Recovered</p>
          </span>
          <span className="item">
          <CountUp start={0} end={worldDeaths} useEasing={true} separator=',' decimal={'3', '6'}/>
          <p className="title">Worldwide Deaths</p>
          <p>{(( deaths / worldDeaths ) * 100).toFixed(2)}%</p>
          <p>from Worldwide Deaths</p>
          </span>
        </div>
        <div className="mapAndChart">
            <LeafletMap mapCountry={currentCountry} deadPercentage={deathsPercentage} /> 
            <RecoveredChart mapCountry={currentCountry} countryRecovered={dailyCountryRecovered} countryDates={date}/> :
        </div>
   
      </div>
    </div>
  );
}

export default CountryData;
