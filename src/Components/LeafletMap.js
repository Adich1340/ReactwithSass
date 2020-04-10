import React, { useState, useEffect, useRef } from 'react';
import { Map, Marker, Popup, TileLayer, CircleMarker, Tooltip } from 'react-leaflet';
import countriesData from '../Worldwide.json';
import CountryData from './CountryData';

function LeafletMap(props){
  const [country, setCountry] = useState(props.mapCountry);
  const [index, setIndex] = useState(0);
  const [deadPre, setDeadPre] = useState(props.deadPercentage);

  useEffect(() => {
    setCountry(props.mapCountry);
    countriesData.find(function(item, i){
      if(item.name === country){
        setIndex(i);
      }
    });
  });


  return (
    <div className="mapbox">
      <Map center={[-0.09, 51.505]} zoom={2}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker
            position={[
              countriesData[index].latlng[0],
              countriesData[index].latlng[1]
            ]}
          />

          <CircleMarker
            center={[countriesData[index].latlng[0], countriesData[index].latlng[1]]}
            radius={props.deadPercentage}
            fillOpacity={0.4}
            stroke={false}
            color="#FFFF00"
          >
            <Tooltip direction="right" offset={[-8, -2]} opacity={1}>
              <span>{countriesData[index].name + ": " + "Deaths percentage is " + props.deadPercentage + " %"}</span>
            </Tooltip>
          </CircleMarker>
      </Map>
    </div>
  )
}

export default LeafletMap;
