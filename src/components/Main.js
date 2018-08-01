import React, { Component } from 'react';

import { Switch, Route } from 'react-router-dom';

import VideoList from './VideoList';
import Playing from './Playing';
import About from './About';
import Home from './Home';

import './styles/Main.css';

class Main extends Component {
  

  render() {
    console.log('Main: ', this.props.toSearch)
    return (
        
        <div className="Main">
            <Switch>
                <Route exact path='/' component={ Home }></Route>
                <Route exact path='/Home' render={(props) => (<VideoList toSearch={this.props.toSearch} {...props}/>)} ></Route>
                <Route path='/Search' component={ VideoList }></Route>
                <Route path='/Watch' component={ Playing }></Route>
                <Route path='/About' component={ About }></Route>
                <Route  component={ VideoList }></Route>
            </Switch>
        </div>
    );
  }
}

export default Main;