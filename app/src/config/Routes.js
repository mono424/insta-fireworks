import React from 'react';
import { Switch, Route } from 'react-router-dom'
import Home from '../pages/home';
import Settings from '../pages/settings';

export default function(props) {
  return (
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route exact path='/settings' component={Settings}/>
    </Switch>
  );
};
