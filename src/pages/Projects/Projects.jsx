import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import ProjectCard from '../../components/ProjectCard/ProjectCard'
import Styles from './Projects.module.css'

const Projects = () => {
  const [projects, setProjects] = useState(null);

  const fetchProjects = async () => {
    try {
      const response = await fetch('https://localhost:7192/api/project', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });
      if(response.ok){
          const data = await response.json();
          setProjects(data);
      }
      else{
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchProjects();
  }, []);
  return (
    <>
      <Navbar/>
      <div style={{height: '65px'}}></div>
      <div className={Styles.projectCardWrap}>
      {projects ? (
          projects.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              desc={project.description}
              id={project.id}
            />
          ))
        ) : (
          <p>Loading projects...</p>
        )}
      </div>
    </>
  )
}

export default Projects
