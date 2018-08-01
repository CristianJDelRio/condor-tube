import { NavLink } from 'react-router-dom';
import React, { Component } from 'react';

import './styles/NavBar.css';

import logo from '../logo.svg';

class NavBar extends Component {

    constructor(){
        super();
        this.state = {
            currentUrl: ''
        }
    }


    handleKeyPress = (e) => { 
        if (e.key === 'Enter' && e.target.value){
            let word = e.target.value.split(' ').join('+');
            this.getVideoByWord(word);
        }
    }

    getHomeVideos = () => {
        let params = '&order=relevance&';
        window.location.replace(`/home/search?${params}`);
    }

    getLastVideos = () => {
        let params = `&order=date&`;
        window.location.replace(`/last-videos/search?${params}`);

    }

    getMostViewed = () => {
        let params = `&order=viewCount&`;
        window.location.replace(`/most-viewed/search?${params}`);
    }

    getVideoByWord = (word) => {
        let params = `&q=${word}&order=viewCount&`
        window.location.replace(`/home/search?${params}`);
    }

    render() {
    return (
      
        <nav>
            <div className="navbar navbar-expand-lg navbar-dark bg-condor-tube fixed-top">
                <div className='col-md-12'>
                    <a className="navbar-brand " href="#">
                        <img className='logo' src={logo}/>
                    </a>

                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <i className="fas fa-bars"></i>
                    </button>
                    
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item ">
                                <NavLink activeClassName="active" to='/Home/' onClick={this.getHomeVideos} className="nav-link">Home</NavLink>
                            </li>
                            <li className="nav-item">
                            <NavLink activeClassName="active" to='/last-Videos/' onClick={this.getLastVideos}  className="nav-link" >Last Videos</NavLink>
                            </li>
                            <li className="nav-item">
                            <NavLink activeClassName="active" to='/most-viewed/' onClick={this.getMostViewed} className="nav-link" >Most Viewed</NavLink>
                            </li>
                            <li className="nav-item">
                            <NavLink activeClassName="active" to='/watch' className="nav-link" >Playing</NavLink>
                            </li>
                            <li className="nav-item">
                            <NavLink activeClassName="active" to='/about' className="nav-link" >Credits</NavLink>
                            </li>
                        </ul>
                        <div className="ml-auto nav-item" >
                            <label>
                                <span><i className="fas fa-search"></i> </span>
                                <input className='input' type="text" name="search" placeholder='Search..' onKeyPress={this.handleKeyPress}/>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </nav>

    );
  }
}

export default NavBar;