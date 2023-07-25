import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

export const CreateTask = () => {
    const [cookies, _] = useCookies(["access_token"]);
    const userID = window.localStorage.getItem("userID");

    const [task, setTask] = useState({
        name: "",
        description: "",
        scheduledTime: 0,
        priorityLevel: 0,
        userOwner: userID
    });

    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setTask({ ...task, [name]: value });
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post("http://localhost:3001/tasks", task, { headers: { authorization: cookies.access_token }});
            alert("Task Created");
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="create-task">
            <h2> Create Task </h2>
            <form onSubmit={onSubmit}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" value={task.name} onChange={handleChange} />
                <label htmlFor="description">Description</label>
                <textarea id="description" name="description" value={task.description} onChange={handleChange} />
                <label htmlFor="scheduledTime">Scheduled Time</label>
                <input type="date" id="scheduledTime" name="scheduledTime" value={task.scheduledTime} onChange={handleChange} />
                <label htmlFor="priorityLevel">Priority Level (integer) </label>
                <input type="number" id="priorityLevel" name="priorityLevel" value={task.priorityLevel} onChange={handleChange} />
                <br />
                <button type="submit" className="submit-button">Create Task</button>
            </form>
        </div>
    )
};