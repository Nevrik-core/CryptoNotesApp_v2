import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { App } from 'components/App';
import './index.css';
import { AuthContext } from 'context/AuthContext';
import { auth } from './services/firebase/config';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <AuthContext.Provider value={auth}>
        <App />
      </AuthContext.Provider>
    </Router>
  </React.StrictMode>
);
