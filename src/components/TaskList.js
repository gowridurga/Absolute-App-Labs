import React from "react";
import { getUsers } from "../utils/storage";    
import TaskItem from "./TaskItem";

const TaskList = ({ tasks = [], title = "Tasks", onToggleComplete, isAdmin = false}) => {
    const users = getUsers();
    const safeUsers = Array.isArray(users) ? users : [];

    const safeTasks = Array.isArray(tasks) ? tasks : [];

    return(
        <div className="task-list">
            <h2>{title}</h2>
            {safeTasks.length === 0 && <p className="no-tasks">NO tasks found.</p>}

            <div className="tasks-container">
                 {safeTasks.map((task) => {
                const assigneeId = task.assigneeId || task.assignedId;
                const assignee = safeUsers.find((user) => user.id === task.assignedId);
                const assigneeName = assignee ? assignee.username : `User: ${assigneeId}`;

                return(
                    <TaskItem key={task.id} task={task} assigneeName={assigneeName} onToggleComplete={onToggleComplete}/>
                );
            })}
            </div>
           
        </div>
    );
};

export default TaskList;