import React from 'react';
import './App.css';
import View from './Component/Create';
import {Switch,Redirect,Route} from 'react-router-dom';
import Display from './Component/Display';

function App(props) {
  return ( 
  <div>
    <Switch>
    <Route path={'/posts/:id'} render={(rprops)=><Display {...props} {...rprops}/>}/>
    <Route path={'/posts'}  component={View}  />
    <Route path={'/'}  render={()=><Redirect to='/posts'/>}/>
    </Switch>
  </div>
  );
}

export default App;
