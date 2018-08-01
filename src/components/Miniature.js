import React, { Component } from 'react';
import moment from 'moment'

import './styles/Miniature.css';

class Miniature extends Component {

  constructor() {
    super();

    this.state = {
        videoList: [],
        keyword: '',
        nextPageToken: '',
    }; 
  } 


  handleClick(e){ 
    console.log(this.props.id)
    window.location.replace(`/watch?id=${this.props.id}`);
  } 

  render() {
      return (

        <li className="miniature">
          <img className='img-thumb' onClick={this.handleClick.bind(this)}  src={this.props.thumbnail}/>
          <p>
            <span className='title'>

              {
                (this.props.title.length < 35) ? this.props.title : 
                  this.props.title.substring(0, 35) +'...'
              }
                
              <br/>
            </span>
                  
                  {this.props.channel}
                  
                  <br/>

                  {moment(new Date(this.props.publishedAt))
                    .format('DD / MM / YYYY')}
            </p>
        </li>
      
    );
  }
}

export default Miniature;