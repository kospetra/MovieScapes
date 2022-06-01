import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import './index.css';
import App from './pages/App/App';
import HomePage from './pages/Home/HomePage';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    {/* <App /> */}
    <BrowserRouter>
    <Switch>
      <Route path='/' exact component={App} />
      <Route path='/home' component={HomePage} />
    </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
