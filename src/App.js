import React from "react";
import './App.css';
import HomePage from "./Homepage/HomePage";
import TenantInvoice from './TenantInvoice/TenantInvoice'
import OwnerInvoice from "./OwnerInvoice/OwnerInvoice";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
function App() {
  return (
    <Router>
        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route exact path='/tenantinvoice' component={TenantInvoice}/>
          <Route exact path='/ownerinvoice' component={OwnerInvoice}/>
        </Switch>
      </Router>
  )
}

export default App;
