import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

const Tasks = () => {
    const [tasks, setTasks] = useState([]);


    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/tasks-all')
        .then(response => {
            setTasks(response.data);
        })
        .catch(error =>{
            console.error("There was an error fetching the task!", error);
        })
    },[]);

    return(
        <div>
            <h1>Task List</h1>
            <ul>
                {tasks.map(task => (
                    <li key={task.id}> {task.title}</li>
                ))}
            </ul>
        </div>
    )
        
} ;

export default Tasks;
