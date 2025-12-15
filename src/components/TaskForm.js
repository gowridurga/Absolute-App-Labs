import React, {useEffect, useState} from "react";
import { getUsers, getTasks, saveTasks } from "../utils/storage";

const TaskForm = ({ onTasksChange }) => {
    const [users, setUsers] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [assigneedId, setAssigneedId] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        const allUsers = getUsers();
        const safeUsers = Array.isArray(allUsers) ? allUsers : [];
        const onlyRegularUsers = safeUsers.filter((user) => user.role === "user");
        setUsers(onlyRegularUsers);
    }, []);

    const createId = () => Date.now();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title.trim() || !assigneedId) {
            setMessage("Please enter a title and select a user.");
            setTimeout(() => setMessage(""), 3000);
            return;
        }

        const newTask = {
            id: createId(),
            title: title.trim(),
            description: description.trim(),
            assignedId: Number(assigneedId),
            status: "pending",
        };

        const existingTasks = getTasks();
        const safeTasks = Array.isArray(existingTasks) ? existingTasks : [];
        const updatedTasks = [...safeTasks, newTask];

        saveTasks(updatedTasks);
        
        if (onTasksChange) {
            onTasksChange(updatedTasks);
        }

        setTitle("");
        setDescription("");
        setAssigneedId("");
        setMessage("Task created and assigned successfully!");
        setTimeout(() => setMessage(""), 3000);
    };

    return (
        <form onSubmit={handleSubmit} className="task-form">
            <h2>Create Task</h2>

            <label> <spam>Title</spam>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required/>
            </label>
            
             <label> <spam>Description</spam>
                <input value={description} onChange={(e) => setDescription(e.target.value)} rows={3}/>
            </label>
            
            <label> <spam>Assign to</spam>
                <select value={assigneedId} onChange={(e) => setAssigneedId(e.target.value)} required>
                     <option value="">select user</option>
            {users.map((user) => (
                <option key={user.id} value={user.id}>
                    {user.username}
                </option>
            ))}
                </select>
            </label>
            
            <button type="submit">Create Task</button>
            {message && <p className="success-message">{message}</p>}
        </form>
    );
};

export default TaskForm;