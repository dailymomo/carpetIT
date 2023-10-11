import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './start_page/StartPage.css';
import './dashBoard/dashboardcss/Dashboard.css';
import './register/Register.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';





const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <BrowserRouter>
      <AuthProvider>
        <Routes>
            <Route path='*' element={<App />}></Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

