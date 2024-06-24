
import React, { useEffect, useState } from "react";
const Home = () => {
    const [tareas, setTareas] = useState([]);
    const [tarea, setTarea] = useState("");
    const [showResetButton, setShowResetButton] = useState(false);
    const fetchGetTasks = () => {
        fetch('https://playground.4geeks.com/todo/users/StephanieMToyo', {
            method: "GET",
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setTareas(data.todos);
            })
            .catch(error => console.log(error));
    };
    const fetchPostTasks = () => {
        const nuevaTarea = {
            label: tarea,
            is_done: false
        };
        fetch('https://playground.4geeks.com/todo/todos/StephanieMToyo', {
            method: "POST",
            body: JSON.stringify(nuevaTarea),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                fetchGetTasks();
                setTarea("");
                setShowResetButton(true); /* mostramos el boton al postear*/
            })
            .catch(error => console.log(error));
    };
    const fetchDeleteTasks = (id) => {
        fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
            method: "DELETE",
        })
            .then(response => console.log(response))
            .then(data => {
                fetchGetTasks();
                console.log(data);
            })
            .catch(error => console.log(error));
    };
    const fetchDeleteUser = () => {
        fetch('https://playground.4geeks.com/todo/users/StephanieMToyo', {
            method: "DELETE",
        })
            .then(response => console.log(response))
            .then(data => {
                console.log("Usuario eliminado:", data);
                fetchCreateUser();
                setShowResetButton(false);   /* para esconder el boton*/
            })
            .catch(error => console.log(error));
    };
    const fetchCreateUser = () => {
        fetch('https://playground.4geeks.com/todo/users/StephanieMToyo', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ todos: [] })
        })
            .then(response => response.json())
            .then(data => {
                console.log("Usuario creado:", data);
                fetchGetTasks();
            })
            .catch(error => console.log(error));
    };
    useEffect(() => {
        fetchGetTasks();
        fetchCreateUser();
    }, []);
    const handleChange = (e) => {
        setTarea(e.target.value);
    };
    const handleKeyEnter = (e) => {
        if (e.code === "Enter" || e.code === "Intro") {
            fetchPostTasks();
        }
    };
    return (
        <div className="hola5">
            <h1>To do with React and Fetch</h1>
            <input
                type="text"
                name="tarea"
                id="tarea"
                onChange={handleChange}
                value={tarea}
                onKeyDown={handleKeyEnter}
            />
            <ul className="list-group">
                {tareas?.map((tareaItem, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                        {tareaItem.label}
                        <button className="btn btn-danger" id="botonrojo" onClick={() => fetchDeleteTasks(tareaItem.id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
            {showResetButton && (
                <button className="btn btn-dark" onClick={fetchDeleteUser}>Reiniciar To Do</button>
            )}
        </div>
    );
};
export default Home;


