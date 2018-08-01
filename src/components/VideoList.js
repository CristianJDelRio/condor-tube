import React, { Component } from 'react';

import logo from '../logo.svg';
import Miniature from './Miniature';

import './styles/VideoList.css';

const maxResults = 20;
const apiKey = '&key=AIzaSyASSJNgzHQQDmhotVtZZwUbDGibRw7OQCc';


class VideoList extends Component {

    constructor() {
        super();

        this.state = {
            videoList: [],
            lasParams: '',
            nextPageToken: '',
        };
    }

    componentDidMount() {
        let url = window.location.href;
        if (url.includes('search')) {
            let reqParams = url.split('?')[1];
            this.newSearch(reqParams);
        } else
            this.newSearch('&order=relevance&');
    }

    updateState(videoData, keyWord, nextPageToken) {

        if (!nextPageToken) nextPageToken = '';
        videoData.forEach(data => {
            let videoFromApi = {
                id: data.id.videoId,
                channel: data.snippet.channelTitle,
                title: data.snippet.title,
                publishedAt: data.snippet.publishedAt,
                thumbnail: data.snippet.thumbnails.medium
            };

            this.setState({
                videoList: this.state.
                    videoList.concat([videoFromApi]),
                nextPageToken: nextPageToken,
                keyword: keyWord

            });
        });
    }

    newSearch(keyWord) {
        this.resetState();
        keyWord = keyWord.split(' ').join('+');

        this.setState({
            videoList: this.state.videoList,
            lasParams: keyWord,
            nextPageToken: this.state.nextPageToken
        });

        let url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${maxResults}${keyWord}type=video${apiKey}`
        fetch(url)
            .then(response => response.json())
            .then(apiData => {
                this.updateState(apiData.items, keyWord, apiData.nextPageToken);
            })
            .catch(err => console.log(err));
    }

    continueSearch() {
        let keyWord = this.state.keyword;
        let nextPageToken = this.state.nextPageToken;
        let url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${maxResults}${this.state.lasParams}pageToken=${nextPageToken}&q=${keyWord}&type=video${apiKey}`;
        fetch(url)
            .then(response => response.json())
            .then(apiData => {
                this.updateState(apiData.items, keyWord, apiData.nextPageToken);
            }).catch(err => console.log(err));
    }

    resetState() {
        this.setState({
            videoList: [],
            keyword: '',
            nextPageToken: ''
        });
    }

    handleScroll = (e) => {
        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
        if (bottom)
            this.continueSearch();
    }

    render() {
        if (this.state.videoList.length > 0) {
            return (

                <ul className='video-list' onScroll={this.handleScroll}>
                    {
                        this.state.videoList
                            .map(video => <Miniature key={video.id} id={video.id} title={video.title}
                                channel={video.channel} publishedAt={video.publishedAt}
                                thumbnail={video.thumbnail.url} />)
                    }
                </ul>

            );
        } else
            return (

                <img className='loading-logo' src={logo} />

            );
    }
}
export default VideoList;