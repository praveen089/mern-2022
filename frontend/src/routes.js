import React from 'react'
import { createBrowserRouter } from "react-router-dom";
import App from './App';
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';

export default createBrowserRouter([
    {   
        element: <App />,
        children:[
            {
            path:"/",
            element: <Home />
            },
            {
            path:"/login",
            element: <Login />
            }, 
            {
            path:"/register",
            element: <Register />
            },      
        ],
        },

])