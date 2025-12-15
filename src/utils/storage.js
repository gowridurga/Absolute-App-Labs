export const getUsers = () => {
    const stored = localStorage.getItem("users");
    return stored ? JSON.parse(stored) : [];
};

export const getTasks = () => {
    const stored = localStorage.getItem("tasks");
    return stored ? JSON.parse(stored) : [];
};

export const saveTasks = (tasks) => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

export const saveUsers = (users) => {
    localStorage.setItem("users", JSON.stringify(users));
}


export const initializeStorage = () => {
    const existingUsers = localStorage.getItem("users");

    if (!existingUsers) {
        const defaultUsers = [
            {id: 1, username: "admin", password: "admin123", role: "admin"},
            {id: 2, username: "user1", password: "user123", role: "user"},
        ];

        saveUsers(defaultUsers);
    }

    const existingTasks = localStorage.getItem("tasks");

    if (!existingTasks) {
        saveTasks([]);
    }
};


export const verifyLogin = (username, password) => {
    const users = getUsers();
    const user = users.find(
        (u) => u.username === username && u.password === password
    );
    return user || null;
};

export const getUsersById = (userId) => {
    const users = getUsers();
    return users.find((u) => u.id === userId) || null;
};









