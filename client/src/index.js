import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { HashRouter as Router } from 'react-router-dom';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import { UserProvider } from './Context/UserContext';
import { BookProvider } from "./Context/BookContext";

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
    <BookProvider>
      <Router>
        <App />
      </Router>
      </BookProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
