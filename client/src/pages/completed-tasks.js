import { useState, useEffect } from 'react';
import axios from 'axios';

export const CompletedTasks = () => {
    const [completedTasks, setCompletedTasks] = useState([]);

    const userID = window.localStorage.getItem("userID");

    useEffect(() => {
        const fetchCompletedTask = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/tasks/completed-task/${userID}`);
                setCompletedTasks(response.data.completedTasks);
            } catch (err) {
                console.error(err);
            }
        };

        fetchCompletedTask();
    }, []);

    const [sortedCompletedTasks, setSortedCompletedTasks] = useState([]);

    useEffect(() => {
        const sortedByPriority = completedTasks.slice().sort((task1, task2) => task2.priorityLevel - task1.priorityLevel);
        setSortedCompletedTasks(sortedByPriority);
    }, [completedTasks]);

    const uncompleteTask = async (taskID) => {
        try {
            const response = await axios.delete("http://localhost:3001/tasks/completed-task", {
                data: {
                    taskID,
                    userID,
                },
            });
            setCompletedTasks(response.data.completedTasks);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h1> Completed Tasks </h1>
            <ul>
                {sortedCompletedTasks.map((task) => (
                    <li key={task._id}>
                        <div>
                            <h2>{task.name}</h2>
                            <button onClick={() => uncompleteTask(task._id)}>Uncomplete Task</button>
                        </div>
                        <div className="descriptions">
                            <p>{task.descriptions}</p>
                        </div>
                        <div className="scheduledTime">
                            <p>Scheduled Time: {task.scheduledTime}</p>
                        </div>
                        <div className="priorityLevel">
                            <p>Priority Level: {task.priorityLevel}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
};
