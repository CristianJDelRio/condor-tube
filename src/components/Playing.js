import React, { Component } from 'react';
import './styles/Watching.css';

const apiKey = 'AIzaSyASSJNgzHQQDmhotVtZZwUbDGibRw7OQCc';

class Playing extends Component {

    constructor() {
        super();

        this.state = {
            id: '',
            channel: '',
            title: '',
            publishedAt: Date,
            thumbnail: '',
            description: '',
            commentCount: 0,
            dislikeCount: 0,
            likeCount: 0,
            viewCount: 0,
            tags: []
        };
    }

    findVideoById(id) {
        let url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${id}&type=video&key=${apiKey}`
        fetch(url)
            .then(response => response.json())
            .then(apiData => this.updateState(apiData))
            .catch(err => console.log(err));
    }

    updateState(data) {

        data.items.forEach(videoInfo => {
            console.log(videoInfo)
            this.setState({
                id: videoInfo.id,
                channel: videoInfo.snippet.channelTitle,
                title: videoInfo.snippet.localized.title,
                publishedAt: videoInfo.snippet.publishedAt,
                thumbnail: (videoInfo.snippet.thumbnails.maxres)? //Toma la URL de los thumbnail de mejor calidad
                    videoInfo.snippet.thumbnails.maxres.url : 
                    videoInfo.snippet.thumbnails.high.url,
                description: videoInfo.snippet.description,
                commentCount: videoInfo.statistics.commentCount,
                dislikeCount: videoInfo.statistics.dislikeCount,
                likeCount: videoInfo.statistics.likeCount,
                viewCount: videoInfo.statistics.viewCount,
                tags: videoInfo.snippet.tags,
            });
            console.log(this.state);
        });

    }

    findRelatedVideos(){
        let params = `&relatedToVideoId=${ this.state.id }&order=relevance&`;
        window.location.replace(`/home/search?${params}`);
    }

    componentDidMount() {
        let url = window.location.href;
        if(url.includes('id=')) {
            let id = url.split('id=')[1];
            this.findVideoById(id)}
    }

    render() {
        
        return (

            <div>
                <div className='video-bg'>
                    <img src={ this.state.thumbnail}/>
                    <div className='img-overlay'>
                    </div>
                </div>
                <div className='row watching' >
                    <div className='col-md-8'>
                        <div className='videoWraper'>
                            <iframe width="560" height="400" src={`https://www.youtube.com/embed/${this.state.id}`} frameborder="0" allow="autoplay; encrypted-media" allowfullscreen='true'></iframe>
                            <h1 className='title'>{this.state.title}</h1>
                            <p >
                                <span> {new Date(this.state.publishedAt).getFullYear()} </span>
                                <span> <i className="fas fa-eye"></i>  { this.state.viewCount} </span>
                                <span className='like-span'> <i className="fas fa-thumbs-up"></i> {this.state.likeCount}</span>
                                <span className='dislike-span'> <i className="fas fa-thumbs-down"></i> {this.state.dislikeCount}</span>
                            </p>
                        </div>
                    </div>
                    <div className='col-md-4 info-video'>
                        <p className='description'>
                        {this.state.description}
                        </p>
                    </div>
                    
                </div> 
                <div className='related-video' onClick={this.findRelatedVideos.bind(this)} data-type="warning" data-toggle="tooltip" data-placement="top" title="Related Videos">
                
                    <i className="fas fa-plus-circle"  ></i>
                </div>
            </div>   
                
        );
    }
}

export default Playing;

/* */