import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';

import ProjectCard from './ProjectCard';

const Project = () => {
    const { id } = useParams();
    const [project, setProject] = useState({});
    const [action, setAction] = useState({});
    const [actionAdding, setActionAdding] = useState(false);

    useEffect(() => {
        axios.get(`https://node-api-challenge-vanshika.herokuapp.com/api/projects/${id}`)
        .then(res => {
            setProject(res.data);
        }).catch(err => console.log(err));
    }, [])

    const ActionAdd = e => {
        e.preventDefault();
        setActionAdding(true);
    }

    const handleChanges = e => {
        setAction({
            ...action,
            [e.target.name]: e.target.value
        });
    }

    const handleActionAdd = e => {
        e.preventDefault();
        axios.post(`https://node-api-challenge-vanshika.herokuapp.com/api/projects/${id}/actions`)
    }

}

export default Project