//import react into the bundle
import React from "react"; // importacion desde react
import ReactDOM from "react-dom/client"; //iimportacion de react dom
// include your styles into the webpack bundle
import "../styles/index.css";
//import your own components
import Home from "./component/home.jsx";
//iniciamos nuestra application
//render es mostrar en pantalla
//componente vamos a llamar a todo elemento de React que podamos ejecutar
ReactDOM.createRoot(document.getElementById('app')).render(<Home/>);
