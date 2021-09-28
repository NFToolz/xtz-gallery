import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Wallet from './components/wallet'
import './main.css';

export default function App() {
  const change = e => document.location = e.target.value

  return (
    <Router>
      <Switch>
        <Route path="/:address" children={<Wallet />} />
        <Route path="/" children={
          <div className="middle-out">
            <input type="text" placeholder="Address:" onChange={change} />
          </div>
        } />
      </Switch>
    </Router>
  );
}
