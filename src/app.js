import React from 'react';
import {
  HashRouter,
  Switch,
  Route
} from 'react-router-dom';
import Wallet from './components/wallet'
import './main.css';

export default function App() {
  const change = e => document.location = `#/${e.target.value}`;

  return (
    <HashRouter>
      <Switch>
        <Route path="/:address">
          <Wallet />
        </Route>
        <Route path="/">
          <div className="middle-out">
            <input type="text" placeholder="Address:" onChange={change} />
          </div>
        </Route>
      </Switch>
    </HashRouter>
  );
}
