import React, { Component } from 'react';

import './styles/About.css'

class About extends Component {
  render() {
    return (
        <div className='about'>
        <h1>Author:</h1>
        <h2>Cristian Del Río Martinez</h2>
        <h3>Web Developer</h3>
        <h3>Cel. 3004323978</h3>
        <h3>@CristianJDelRio</h3>
        <br/>
        <br/>
        <h4>Check Code: </h4>
        
        <a href='https://github.com/CristianJDelRio/condor-tube' className='gitHub Logo'>
        <i className="fab fa-github"></i>
        </a>
      </div>
    );
  }
}

export default About;
