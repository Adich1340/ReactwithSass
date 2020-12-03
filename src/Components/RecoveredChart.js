import React, { Component } from 'react'
import Chart from "chart.js";
let myLineChart;

Chart.defaults.global.defaultFontFamily = "'PT Sans', sans-serif"
Chart.defaults.global.legend.display = false;

export default class RecoveredChart extends Component {
    chartRef = React.createRef();

    componentDidMount() {
        this.buildChart();
    }

    componentDidUpdate() {
        this.buildChart();
    }

    buildChart = () => {
        const myChartRef = this.chartRef.current.getContext("2d");
        const currentCountryRecovered = this.props.countryRecovered;
        const currentCountryDates = this.props.countryDates;

        console.log("AAAAA :", currentCountryRecovered)
        console.log("BBBBB :", currentCountryDates)

        if (typeof myLineChart !== "undefined") myLineChart.destroy();

        myLineChart = new Chart(myChartRef, {
            type: "bar",
            data: {
                labels: currentCountryDates,
                datasets: [
                    {
                        label: "Recovered",
                        backgroundColor: "#4B48ED",
                        data: currentCountryRecovered,
                        fill: false,
                         borderColor: "yellow",
                        borderWidth: 2
                    }
                ]
            },
            options: {
              beginAtZero: true
            }
        });

    }

    render() {
        return (
            <div >
                <canvas
                    id="myChart"
                    ref={this.chartRef}
                    width="auto" 
                    height="650" 
                    margin-top="100px"
                />
            </div>
        )
    }
}

