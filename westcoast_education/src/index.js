import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from './Context/Auth.Context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <AuthContextProvider>
    <App />
    </AuthContextProvider>
);