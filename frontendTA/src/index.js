import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from "./router/Router";
import 'bootstrap/dist/css/bootstrap.min.css';
ReactDOM.render(<BrowserRouter>
    <AppRoutes />
</BrowserRouter>, document.getElementById('root'));

