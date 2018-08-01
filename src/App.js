import React, { Component } from 'react';
import PropTypes from 'prop-types';

import NavBar from './components/NavBar';
import Main from './components/Main';

import './App.css';

class App extends Component {

  static propTypes = {
    children: PropTypes.object.isRequired
  };


  render() {
    const { children } = this.props;
    return ( 
    
      <div className='App'>
        <NavBar/>
        <Main />
      </div>
    
    );
  }
}

export default App;
