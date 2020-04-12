import React, {useState} from 'react';
import axios from 'axios'

const ProjectCard = (props) => {
    const [project, setProject] = useState(props.p);
    const [editing, setEditing] = useState(false);
    const [deleted, setDeleted] = useState(false);

    const handleEdit = e => {
        e.preventDefault();
        setEditing(true);
    }

    const handleChanges = e => {
        setProject({
            ...project,
            [e.target.name]: e.target.value
        });
    }

    const handleUpdate = e => {
        e.preventDefault();
        axios.put(`https://node-api-challenge-vanshika.herokuapp.com/api/projects/${project.id}`, project)
        .then(res => {
            setEditing(false);
        })
        .catch(err => console.log(err));
    }

    const handleCancel = e => {
        e.preventDefault();
        setEditing(false);
    }

    const handleDelete = e => {
        e.preventDefault();
        axios.delete(`https://node-api-challenge-vanshika.herokuapp.com/api/projects/${project.id}`)
        .then(res => {
            setDeleted(true);
            setTimeout(() => props.history.push('/'), 1000)
        })
    }

    return (
        <div className = 'project-card'>
            {deleted && <h2>Deleted this project</h2>}
            {!deleted && !editing && (
                <div className='project-body'>
                    <h3 className='project-title'> {props.p.name} </h3>
                    <p className='project-description'> {props.p.description} </p>
                    <div className = 'buttons-container'>
                        <button className='edit btn' onClick={handleEdit}>Edit</button>
                        <button className='delete btn' onClick={handleDelete}>Delete</button>
                    </div>
                </div>
            )}
            {!deleted && editing && (
                <form className='edit-project form'>
                    <label htmlFor='name'>
                        Name
                        <input type='text' id='name' name='name' value={project.name} onChange={handleChanges} />
                    </label>
                    <label htmlFor='description'>
                        Description
                        <input type='textarea' id='description' name='description' value={project.description} onChange={handleChanges} />
                    </label>
                    <div className = 'buttons-container'>
                        <button className='edit btn' onClick={handleUpdate}>Save Changes</button>
                        <button className='delete btn' onClick={handleCancel}>Cancel</button>
                    </div>
                </form>
            )}
        </div>
    )
}

export default ProjectCard;