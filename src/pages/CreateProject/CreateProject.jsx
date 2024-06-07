import React, { useState, useRef, useMemo, useEffect } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import {Icon} from 'leaflet'
import 'leaflet/dist/leaflet.css';
import Navbar from '../../components/Navbar/Navbar';
import Button from '@mui/material/Button';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Styles from './CreateProject.module.css';
import PlaceIcon from '../../assets/marker.svg';

const CreateProject = () => {
  const center = {
    lat: 30.76,
    lng: 76.78,
  };
  const [buttonText, setButtonText] = useState("Create");
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [position, setPosition] = useState(center);
  const [positionUrl, setPositionUrl] = useState(`https://www.google.com/maps/place/${center.lat},${center.lng}`);
  const [error, setError] = useState("");

  useEffect(() => {
    setPositionUrl(`https://maps.google.com/maps?q=${position.lat},${position.lng}&hl=es;z=14&amp&output=embed`)
}, [position]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonText("Creating");
    try {
        const response = await fetch(`https://localhost:7192/api/project`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: title,
                description: description,
                location: positionUrl
            }),
            credentials: 'include'
        });
        if (response.ok) {
            window.location.href = `/`;
        }
        else {
          console.log(response);
          setError("Either you are logged out or fields are empty");
        }
    } catch (error) {
        setError("Network Error");
    } finally {
        setButtonText("Create");
    }
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
        <p className={Styles.errorp}>{error}</p>
      </form>
    </>
  );
};

export default CreateProject;
