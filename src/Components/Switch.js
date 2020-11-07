import React from 'react';
import LeafletMap from './LeafletMap';
import Chart from './Chart';

import '../Styles/Switch.css';

export default class Switch extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          globeMap: false
        }

        this.toggleButton = this.toggleButton.bind(this);
    }

    toggleButton() {
       this.setState((currentState) => ({
           globeMap: !currentState.globeMap,
       }));
     }

    render(){
        return(
          <div>
            <botton className="toggle" onClick={this.toggleButton}>Tap here for more data</botton>
            {!this.state.globeMap ?
                      <LeafletMap mapCountry={this.props.mapCountry} deadPercentage={this.props.deadPercentage} /> :
                      <Chart mapCountry={this.props.mapCountry} />}
          </div>
        )
    }
}
