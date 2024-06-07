import React, { useState, useRef, useMemo, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import {Icon} from 'leaflet'
import 'leaflet/dist/leaflet.css';
import Navbar from '../../components/Navbar/Navbar';
import Button from '@mui/material/Button';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Styles from './CreateProject.module.css';
import PlaceIcon from '../../assets/marker.svg';
import markerIconPng from "leaflet/dist/images/marker-icon.png"

const CreateProject = () => {
  const center = {
    lat: 30.76,
    lng: 76.78,
  };

  const [buttonText, setButtonText] = useState("Create");
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [position, setPosition] = useState(center);

  

  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
          console.log(marker.getLatLng());
        }
      },
    }),
    []
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    const projectData = {
      title,
      description,
      location: position,
    };
    // Send projectData to your API
    console.log(projectData);
  };

  return (
    <>
      <Navbar/>
      <div style={{ height: '65px' }}></div>
      <form className={Styles.createProjectForm} onSubmit={handleSubmit}>
        <div className={Styles.createProjectFormDiv}>
          <h1>Title</h1>
          <input
            id="projectTitle"
            name="projectTitle"
            type="text"
            required
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div className={Styles.createProjectFormDiv}>
          <h1>Description</h1>
          <ReactQuill theme="snow" value={description} onChange={setDescription} />
        </div>
        <div className={Styles.createProjectFormDiv}>
          <h1>Choose Location on Map</h1>
          <MapContainer center={center} zoom={13} scrollWheelZoom={true} style={{ marginTop: '10px', height: '400px', maxWidth: '700px', borderRadius: '0.5em' }}>
            <TileLayer
              url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
              subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
            />
            <Marker
              draggable={true}
              eventHandlers={eventHandlers}
              position={position}
              icon={new Icon({iconUrl: PlaceIcon, iconSize: [50, 50], iconAnchor: [25, 50]})}
              ref={markerRef}>
            </Marker>
          </MapContainer>
        </div>
        <Button variant="contained" type="submit" disableElevation sx={{
          marginTop: '20px', backgroundColor: '#28a08c', color: '#dcdcdc', width: '125px', fontSize: '1.2rem', '&:hover': {
            backgroundColor: '#19695b',
          }
        }}>{buttonText}</Button>
      </form>
    </>
  );
};

export default CreateProject;
