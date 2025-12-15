import React, {useCallback, useEffect, useState} from "react";
import {AuthProvider, useAuth} from "./contexts/AuthContext";
import LoginForm from "./components/LoginForm";
import { getTasks, initializeStorage, saveTasks } from "./utils/storage";
import AdminDashboard from "./components/AdminDashboard";
import TaskList from "./components/TaskList"; 
import './App.css';



const UserDashboard = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);

  const loadUserTasks = useCallback(() => {
    const allTasks = getTasks();
    const userTasks = allTasks.filter(task => task.assignedId === user.id);
    setTasks(userTasks);
  }, [user.id]);

  useEffect(() => {
    loadUserTasks();
  }, [loadUserTasks]);
  

  const handleToggleComplete = (taskId) => {
    const allTasks = getTasks();
    const updatedTasks = allTasks.map(task => {
      if (task.id === taskId) {
        return { ...task, status: task.status === "completed" ? "pending" : "completed" };
      }
      return task;  
    }
    );

    saveTasks(updatedTasks);
    loadUserTasks();
  };

  return (
    <div className="user-dashboard">
      <h2>User Dashboard</h2>
      <p>Welcome, {user.username}! Here are your assigned tasks:</p>
      <TaskList tasks={tasks} title="My Tasks" onToggleComplete={handleToggleComplete} isAdmin={false}/>
    </div>
  );
};

const AppContent = () => {
  const { user, loading, logout, isAdmin, isUser } = useAuth();

  useEffect(() => {
    initializeStorage();
  }, []);

  if (loading){
    return <div className="app-loading">Loading....</div>;
  }

  if (!user) {
    return <LoginForm/>;
  }

  return (
    <div className="App">
      <header className="app-header">
        <span>
          Logged in as <strong>{user.username}</strong> ({user.role})
        </span>
        <button onClick={logout} className="logout-button">Logout</button>
      </header>

      {isAdmin && <AdminDashboard />}
      {isUser && <UserDashboard />}
    </div>
  );
}
    

 const App = () => (
  <AuthProvider><AppContent/></AuthProvider>
 );


 export default App;
  
 