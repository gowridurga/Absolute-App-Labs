# React Task Management Application

A role-based task management system built with React, featuring drag-and-drop functionality and localStorage persistence.

##  Project Overview

This application allows administrators to create and assign tasks to users, while regular users can view their assigned tasks and mark them as completed. All data is persisted using browser's localStorage, eliminating the need for a backend server.


## Default Login Credentials

### Admin Account
- **Username:** admin
- **Password:** admin123

### User Accounts
- **Username:** user1  
  **Password:** user123

- **Username:** user2  
  **Password:** user123

## Technologies Used

- **React 18** - UI framework
- **React Context API** - State management
- **react-dnd** - Drag and drop functionality
- **react-dnd-html5-backend** - HTML5 drag-and-drop backend
- **uuid** - Unique ID generation
- **localStorage** - Data persistence

## Testing

### Test Login

# Test admin login
Username: admin
Password: admin123

# Test user login
Username: user1
Password: user123

## Data Storage

All data is stored in the browser's localStorage:

- **users** - User accounts and credentials
- **tasks** - Task information (title, description, assignee, status)
- **currentUser** - Currently logged-in user session

### Installation

    npm install
    npm start
    http://localhost:3000

#  Project Structure

react-task-management/
├── public/
├── src/
│   ├── components/
|   |   |_ AdminDashboard.js
│   │   ├── LoginForm.js          
│   │   ├── TaskForm.js          
│   │   ├── TaskList.js          
│   │   ├── UserList.js          
│   │   └── TaskItem.js          
│   ├── contexts/
│   │   └── AuthContext.js        
│   │   └── storage.js            
│   ├── App.js                    
│   ├── App.css                  
│   └── index.js                 
├── README.md                     
└── package.json


