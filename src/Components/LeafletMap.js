import React, { useState, useEffect } from 'react';
import {Map,
   Marker,
   TileLayer,
   CircleMarker,
   Tooltip} from 'react-leaflet';
import countriesData from '../Worldwide.json';

const LeafletMap = props => {
  const [country, setCountry] = useState(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setCountry(props.mapCountry);
    countriesData.find((item, index) => {
      if(item.name === country){
        setIndex(index);
      }
    });
  });

  return (
    <div className="mapbox">
      <Map center={[0, 0]} zoom={2}>
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
            radius={props.deadPercentage*5}
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
};

export default LeafletMap;
