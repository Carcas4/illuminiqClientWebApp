import { useState, useEffect } from 'react';
import { Box } from "@mui/material";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import {data} from '../../App';


function LightMap({data}) {


  const lights = [
    { id: 1, name: "Light 1", location: "Location 1", lat: 45.810825, lng: 16.041033, state: "ON" },
    { id: 2, name: "Light 2", location: "Location 2", lat: 45.811390, lng: 16.040999, state: "ON" },
    { id: 3, name: "Light 3", location: "Location 3", lat: 45.811200, lng: 16.041915, state: "ON" },
    { id: 4, name: "Light 4", location: "Location 4", lat: 45.812063, lng: 16.041007, state: "ON" },
    { id: 5, name: "Light 5", location: "Location 5", lat: 45.812067, lng: 16.041702, state: "ON" },
  ];

  const customIconOn= new Icon({
    iconUrl: require("../../img/logo-icon.png"),
    iconSize: [21, 37]
  })
  const customIconOff = new Icon({
    iconUrl: require("../../img/logo-icon-off.png"),
    iconSize: [21, 37]
  });
  // Update the lights array and icons based on sensor data
  const updatedLights = lights.map(light => {
    const sensorData = data.find(sensor => sensor.sensorId === light.sensorId);
    const state = sensorData ? "OFF" : "ON";
    const icon = state === "ON" ? customIconOn : customIconOff;
    return { ...light, state, icon };
  });

  return (
    <div>
    <MapContainer center={[45.811515, 16.041591]} zoom={22} scrollWheelZoom={false}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {updatedLights && updatedLights.map(light => (
        <Marker key={light.id} position={[light.lat, light.lng]} icon={light.icon}>
          <Popup>
            <div>
              <h3>{light.name}</h3>
              <p>{light.location}</p>
              <p>{light.state}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
    <Box m="0 0 10px 20px">
      <h3>Data Logs</h3>
      <ul>
          {data.map(sensorData => (
            <li key={sensorData.id}>{`Light ${sensorData.sensorId} ${sensorData.state}`}</li>
          ))}
      </ul>
    </Box>
    </div>
  );
}



export default LightMap;

