import React, { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Button from '@mui/material/Button';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../Project/quill.css'
import Styles from './CreateProject.module.css';

const CreateProject = () => {
  const [buttonText, setButtonText] = useState("Create");
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  
  return (
    <>
      <Navbar />
      <div style={{ height: '65px' }}></div>
      <form className={Styles.createProjectForm}>
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
        <ReactQuill theme="snow" value={description} onChange={setDescription}/>
        </div>
        <div className={Styles.createProjectFormDiv}>
        <h1>Enter Google Maps Location Url</h1>
        <input
          id="projectTitle"
          name="projectTitle"
          type="url"
          required
          value={location}
          onChange={(event) => setLocation(event.target.value)}
        />
        </div>
        <Button variant="contained" type='submit' disableElevation sx={{
          marginTop: '20px', backgroundColor: '#28a08c', color: '#dcdcdc', width: '125px', fontSize: '1.2rem', '&:hover': {
            backgroundColor: '#19695b',
          }
        }}>{buttonText}</Button>
        {/* <p className={Styles.errorp}>{commentError}</p> */}
      </form>
    </>
  )
}

export default CreateProject
