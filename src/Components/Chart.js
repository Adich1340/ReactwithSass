import React, { useState, useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";
import Chartjs from "chart.js";




const Chart = (props) => {
  const [dailyCountryConfirmed, setDailyCountryConfirmed] = useState([])
  const [dailyCountryRecovered, setDailyCountryRecovered] = useState([])
  const [date, setDate] = useState([])
  const chartContainer = useRef(null);
  const noData = useRef("No Data")
  const [chartInstance, setChartInstance] = useState(null);


  useEffect(() => {
    async function fetchData() {
        const countryData = await fetch(`https://api.covid19api.com/country/${props.mapCountry}`)
        .then(res => res.json())
        const newDailyConfirmed = Object.keys(countryData)
        .map((i => countryData[i].Confirmed))
        const concatConfirmed = dailyCountryConfirmed.concat(newDailyConfirmed)
        return setDailyCountryConfirmed(concatConfirmed)

      }
    fetchData();
  }, [])


  useEffect(() => {
    async function fetchData() {
        const countryData = await fetch(`https://api.covid19api.com/country/${props.mapCountry}`)
        .then(res => res.json())
        const newDailyRecovered = Object.keys(countryData)
        .map((i => countryData[i].Recovered));
        const concatRecovered = dailyCountryRecovered.concat(newDailyRecovered)
        return setDailyCountryRecovered(newDailyRecovered)

      }
    fetchData();
  }, [])


  useEffect(() => {
    async function fetchData() {
        const countryData = await fetch(`https://api.covid19api.com/country/${props.mapCountry}`)
        .then(res => res.json())
        const newDailyDate = Object.keys(countryData)
        .map((i => countryData[i].Date));
        const concatDates = dailyCountryRecovered.concat(newDailyDate)
        return setDate(concatDates)

      }
    fetchData();
  }, [])

  const initialState = {
    type: "bar",
    data: {
    labels: date.map((item) => item),
      datasets: [
        {
          label: "Recovered",
          data: dailyCountryRecovered.map((item) => item),
          backgroundColor: "#4B48ED",
          borderColor: "yellow",
          borderWidth: 2
        }
      ]
    },
    option: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    }
  }

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      const newChartInstance = new Chartjs(chartContainer.current, initialState);
      setChartInstance(newChartInstance);
    }
  }, [chartContainer, dailyCountryConfirmed, dailyCountryRecovered, date]);

  var dataToShow = date.length === 0 ? chartContainer : noData

  return (
    <div>
      <canvas ref={chartContainer}  width="auto" height="650" margin-top="100px" />
    </div>
  );
};

export default Chart;
