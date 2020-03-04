import React, { Component } from 'react'
import axios from 'axios';

import PostItem from './PostItem';
import Loader from '../assets/images/loader.gif';

export class Posts extends Component {
    state = {
        posts: [],
        isLoaded: false
    }

    componentDidMount() {
        axios.get('http://wordpress.test/wordpress/wp-json/wp/v2/posts')
            .then(res => this.setState({
                posts: res.data,
                isLoaded: true
            }))
            .catch(err => console.log(err));
    }

    render() {
        console.log(this.state.posts);
        const { posts, isLoaded } = this.state;
        if (isLoaded && posts.length > 0) {
            return (
                <div className="mt-5 post-container">
                    {posts.map(post => (
                        <PostItem key={post.id} post={post} />
                    ))}
                </div>
            )
        }
        return (
            <div className="loader">
                <img src={Loader} alt="Loader" />
                <p>Loading...</p>
            </div>

        )

    }
}

export default Posts
