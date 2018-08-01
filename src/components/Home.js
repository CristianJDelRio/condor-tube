import React, { Component } from 'react';

import  {Redirect}  from 'react-router-dom';
 
import './styles/Main.css';

class Home extends Component {

/* 
    I had some issues with the navTo react-router-dom import so 
    i created this component to redirect the "/" direction to 
    "/home"
*/

  render() {
    return (
        <Redirect to='/home'/>
    );
  }
}

export default Home;