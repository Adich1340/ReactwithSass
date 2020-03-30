import React, { useState, useEffect } from "react";

import './App.scss';

import CountUp from 'react-countup';



function App() {
  const [confirmed, setConfirmed] = useState(0)
  const [recovered, setRecovered] = useState(0)
  const [deaths, setDeaths] = useState(0)


    useEffect(() => {
      async function fetchData() {
        const data = await fetch("https://covid19.mathdro.id/api/countries/IL")
        .then(res => res.json());
        setConfirmed(data.confirmed.value)
        setRecovered(data.recovered.value)
        setDeaths(data.deaths.value)
      }
      fetchData();
    }, [confirmed, recovered, deaths])

  return (
    <div className="container">
      <div className="title">
        <h2>CoronaVirus Data</h2>
      </div>
      <div className="dataNumbers">
        <span>
          <CountUp className="item" start={0} end={confirmed} duration={2.75} useEasing={true}/>
        </span>
        <span>
          <CountUp className="item second" start={0} end={recovered} />
        </span>
        <span>
        <CountUp className="item third" start={0} end={deaths} />
        </span>
      </div>
   </div>
  );
}
export default App;
