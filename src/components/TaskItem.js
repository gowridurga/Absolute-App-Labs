import React from "react";
import { useDrag } from "react-dnd";

const TaskItem = ({ task, assigneeName, onToggleComplete, isDraggable = false}) => {
    const [{isDragging}, drag] = useDrag (() => ({
        type: "TASK",
        item: {id: task.id, taskData: task},
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
        canDrag: isDraggable,
}), [task , isDraggable]);

    const handleToggle = () => {
        if (onToggleComplete) {
            onToggleComplete(task.id);
        }
    };
    const isCompleted = task.status === "Completed" || task.status === "completed";

    return(
        <div ref={isDraggable ? drag : null} className={`task-card ${isCompleted ? "completed" : ""}${isDragging ? "dragging" : ""}`} style={{ opacity: isDragging ? 0.5 : 1, cursor: isDraggable ? "move" : "default" }}>
            <h3>{task.title}</h3>
            {task.description && <p className="task-description">{task.description}</p>}
            <p>
                <strong>assigned to:</strong> {assigneeName || "Unassigned"}
            </p>
            <p>
                <strong>Status:</strong> <spam className={`status-badge ${isCompleted ? "status-completed" : "status-pending"}`}>{task.status}</spam>
            </p>

            {onToggleComplete && (
                <button onClick={handleToggle} className="toggle-button">
                    {isCompleted ? "Mark as Pending" : "Mark as Completed"}
                </button>
            )}

        </div>
    );
} ;

export default TaskItem;