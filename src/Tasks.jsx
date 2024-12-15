import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import './Task.css';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

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

    const deleteTask = (id) =>{
        axios.post(`http://127.0.0.1:8000/api/tasks-all/delete/${id}`)
        .than(()=> {
            alert("Task deleted");
            fetchTasks();
        })
        .catch(error => console.error("Error deleting task", error));
    };

    return (
      <Container className="mt-5">
        <div>
          <h1 className="text-center">Task List</h1>
          <Row className="mt-4">
            {tasks.map((task) => (
              <Col md={4} key={task.id} className="mb-3">
                <Card>
                  <Card.Body>
                    <Card.Title>{task.title}</Card.Title>
                    <Card.Text>
                      {task.completed ? (
                        <span className="text-success">Completed</span>
                      ) : (
                        <span className="text-warning">pending</span>
                      )}
                    </Card.Text>
                    <Button
                      variant={task.complete ? "secondary" : "success"}
                      onClick={() => markAsCompleted(task.id)}
                      disabled={task.completed}
                    >
                      Done
                    </Button>

                    <Button
                      variant={task.complete ? "secondary" : "danger"}
                      onClick={() => deleteTask(task.id)}
                      style={{
                        marginLeft: "10px",
                        backgroundColor: "#dc3545", // Bootstrap danger red
                        borderColor: "#dc3545",

                      }}
                    >
                      Delete
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </Container>
    );
        
} ;

export default Tasks;
