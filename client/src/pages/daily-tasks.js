import { useState, useEffect } from 'react';
import axios from 'axios';

export const DailyTasks = () => {
    const [dailyTasks, setDailyTasks] = useState([]);

    const userID = window.localStorage.getItem("userID");

    useEffect(() => {
        const fetchDailyTask = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/tasks/daily-task/${userID}`);
                setDailyTasks(response.data.dailyTasks);
            } catch (err) {
                console.error(err);
            }
        };

        fetchDailyTask();
    }, []);

    const [sortedDailyTasks, setSortedDailyTasks] = useState([]);

    useEffect(() => {
        const sortedByPriority = dailyTasks.slice().sort((task1, task2) => task2.priorityLevel - task1.priorityLevel);
        setSortedDailyTasks(sortedByPriority);
    }, [dailyTasks]);

    const undailyTask = async (taskID) => {
        try {
            const response = await axios.delete("http://localhost:3001/tasks/daily-task", {
                data: {
                    taskID,
                    userID,
                },
            });
            setDailyTasks(response.data.dailyTasks);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h1> Daily Tasks </h1>
            <ul>
                {sortedDailyTasks.map((task) => (
                    <li key={task._id}>
                        <div>
                            <h2>{task.name}</h2>
                            <button onClick={() => undailyTask(task._id)}>Set Normal Task</button>
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
