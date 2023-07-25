import { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';

export const Home = () => {
    const [tasks, setTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);
    const [dailyTasks, setDailyTasks] = useState([]);

    const [cookies, _] = useCookies(["access_token"]);
    const userID = window.localStorage.getItem("userID");

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await axios.get("http://localhost:3001/tasks");
                setTasks(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        const fetchCompletedTask = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/tasks/completed-task/ids/${userID}`);
                setCompletedTasks(response.data.completedTasks);
            } catch (err) {
                console.error(err);
            }
        };

        const fetchDailyTask = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/tasks/daily-task/ids/${userID}`);
                setDailyTasks(response.data.dailyTasks);
            } catch (err) {
                console.error(err);
            }
        };

        fetchTask();
        if (cookies.access_token) fetchCompletedTask();
        if (cookies.access_token) fetchDailyTask();
    }, []);

    const completeTask = async (taskID) => {
        try {
            const response = await axios.put("http://localhost:3001/tasks/completed-task", {
                taskID,
                userID,
            }, { headers: { authorization: cookies.access_token }});
            setCompletedTasks(response.data.completedTasks);
        } catch (err) {
            console.error(err);
        }
    };

    const [sortedTasks, setSortedTasks] = useState([]);

    useEffect(() => {
        const combinedTasks = [...tasks];
        const sortedByPriority = combinedTasks.sort((task1, task2) => task2.priorityLevel - task1.priorityLevel);

        setSortedTasks(sortedByPriority);
    }, [tasks]);

    const dailyTask = async (taskID) => {
        try {
            const response = await axios.put("http://localhost:3001/tasks/daily-task", {
                taskID,
                userID,
            }, { headers: { authorization: cookies.access_token }});
            setDailyTasks(response.data.dailyTasks);
        } catch (err) {
            console.error(err);
        }
    };

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

    const isTaskCompleted = (id) => completedTasks.includes(id);
    const isTaskDaily = (id) => dailyTasks.includes(id);

    return (
        <div>
            <h1> All Tasks </h1>
            <ul>
                {sortedTasks.map((task) => (
                    <li key={task._id}>
                        <div>
                            <h2>{task.name}</h2>
                            {isTaskCompleted(task._id) ? (
                                <button onClick={() => uncompleteTask(task._id)}>Uncomplete Task</button>
                            ) : (
                                <button onClick={() => completeTask(task._id)}>Completed Task</button>
                            )}
                            {isTaskDaily(task._id) ? (
                                <button onClick={() => undailyTask(task._id)}>Set Normal Task</button>
                            ) : (
                                <button onClick={() => dailyTask(task._id)}>Set Daily Task</button>
                            )}
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