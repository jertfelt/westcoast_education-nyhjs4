import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from './Context/Auth.Context';
import { StudentContextProvider } from './Context/StudentContext';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <AuthContextProvider>
    <StudentContextProvider>
    <App 
    />
    </StudentContextProvider>
    </AuthContextProvider>
);