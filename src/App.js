import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import './App.css';

import ProjectCard from './components/ProjectCard';
import Project from './components/Project';
import NewProjectForm from './components/NewProjectForm';
import Actions from './components/Actions';

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    console.log('...loading')
    axios.get('https://node-api-challenge-vanshika.herokuapp.com/api/projects/')
    .then(res => {
      console.log(res);
      setProjects(res.data);
    }).catch(err => console.log(err))
  }, [])
  return (
    <div className="App">
      <Router>
      <div className='navbar'>
        <h1>Projects</h1>
        <Link className='navlink' to='/actions'>Actions</Link>
      </div>
      <div className='projects-container'>
        {projects.length === 0
        ? <h2>No Projects Exist</h2>
        : (
            <div className='projects-grid'>
              {projects.map(p => {
                return <ProjectCard key={p.id} p={p} />
              })}
            </div>
          )
        }
        <div className='buttons-container'>
          <Link className='add btn' to='/add-project'>Add Project</Link>
        </div>
      </div>
        <Route exact path='/add-project' component={NewProjectForm} />
        <Route exact path='/:id' component={Project} />
        <Route exact path='/actions' component={Actions} />
      </Router>
    </div>
  );
}

export default App;
