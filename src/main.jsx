import React from 'react'
import ReactDOM from "react-dom/client";
import { AuthProvider  } from './store/AuthProvider.jsx';
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './app/App.jsx'
import "./styles/globals.css";
import "./styles/variables.css";
import "./styles/notes.css";
import "./styles/auth.css";
import "./styles/animations.css";

createRoot(document.getElementById('root')).render(

  
  <AuthProvider>
    <App />
  </AuthProvider>,
)
