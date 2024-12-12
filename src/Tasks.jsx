import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

const Tasks = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetchTasks();

    }, []);
    
    const fetchTasks = () => {
        axios.get('http://127.0.0.1:8000/api/tasks-all')
        .then(response => setTasks(response.data))
        .catch(error => console.error("There was an error fetching the task!", error))
    };

    const markAsCompleted = (id) => {
        axios.post(`http://127.0.0.1:8000/api/tasks-all/completed/${id}`)
            .then(() => {
                alert("Task marked as completed!");
                fetchTasks(); // Refresh the task list
            })
            .catch(error => console.error("Error marking task as completed:", error));
    };

    return(
        <div>
            <h1>Task List</h1>
            <ul>
                {tasks.map(task => (
                    <li key={task.id}> 
                    {task.id}
                    {task.title}
                    {task.completed ? (
                        <span style={{ color: 'green', marginLeft: '10px' }}>Completed</span>
                    ) : (
                        <button onClick={() => markAsCompleted(task.id)} style={{ marginLeft: '10px' }}>
                                Mark as Completed
                            </button>
                    )}
                    </li>
                ))}
            </ul>
        </div>
    );
        
} ;

export default Tasks;
