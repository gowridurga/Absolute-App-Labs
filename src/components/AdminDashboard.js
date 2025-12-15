import React, {useEffect, useState} from "react";
import { getTasks } from "../utils/storage";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import UserList from "./UserList";

const AdminDashboard = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = () => {
        const allTasks = getTasks() || [];
          setTasks(allTasks);
    };

    const handleTasksChange = (updatedTasks) => {
        setTasks(Array.isArray(updatedTasks) ? updatedTasks : []);
        loadTasks();
    };

    return(
        <DndProvider backend={HTML5Backend}>
            <div className="admin-dashboard">
            <h1>Admin Dashboard</h1>
            <TaskForm onTasksChange={handleTasksChange} />
            <div>
                <TaskList tasks={tasks} title="All Tasks" onTasksChange={handleTasksChange} isAdmin={true}/>
                <UserList onTasksChange={handleTasksChange}/>
            </div>
        
              </div>
        </DndProvider>
        
     
    );
};

export default AdminDashboard;