import React, {useEffect, useState} from "react";
import { useDrop } from "react-dnd";
import { getUsers, getTasks, saveTasks } from "../utils/storage";

const UserCard = ({user, onTaskDrop}) => {
    const [{isOver}, drop] = useDrop(() => ({
        accept: "TASK",
        drop: (item) => {
            onTaskDrop(item.Id, user.id);
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }), [user.id, onTaskDrop]);


    return(
        <div ref={drop} className={`user-card ${isOver ? "highlight" : ""}`} style={{backgroundColor: isOver ? '#e3f2fd' : 'white', border: isOver ? '2px dashed #2196f3' : '1px solid #ddd' }}>
            <strong>{user.username}</strong>
            <span className="user-role">(User)</span>
            </div>
            
    );
};

const UserList = ({onTasksChange}) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const allUsers = getUsers();
        const safeUsers = Array.isArray(allUsers) ? allUsers : [];
        setUsers(safeUsers.filter(user => user.role === "user"));
    }, []);

    const handleTaskDrop = (taskId, newAssigneeId) => {
        const allTasks = getTasks();
        const safeTasks = Array.isArray(allTasks) ? allTasks : [];

        const updatedTasks = safeTasks.map((task =>
            task.id === taskId ? {...task, assignedId: newAssigneeId} : task
        ));
        saveTasks(updatedTasks);

        if (onTasksChange) {
            onTasksChange(updatedTasks);
        }   
    };

    return(
        <div className="user-list">
            <h2>Users</h2>
            {users.length === 0 && <p>No users found.</p>}
            <div className="users-container">
                {users.map((user) => (
                    <UserCard key={user.id} user={user} onTaskDrop={handleTaskDrop}/>
                ))}
            </div>
            
           
        </div>
    );
};

export default UserList;


























