import React from 'react';
import './App.css';
import View from './Component/Create';
import {Link,Switch,Route} from 'react-router-dom';
import Post from './Component/Post';
import Display from './Component/Display';

function App(props) {
  return ( 
  <div>
    <Link to="/posts">posts</Link>

    <Switch>
    <Route path={'/posts/:id'} render={(rprops)=><Display {...props} {...rprops}/>}/>
    <Route path={'/posts'}  component={View}  />
    <Route path={'/'}  render={()=><Post/>}/>
    </Switch>
  </div>
  );
}

export default App;
