import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import Moment from 'react-moment';


import '../App.css';

export class PostItem extends Component {
    state = {
        isLoaded: false
    }

    static propTypes = {
        post: PropTypes.object.isRequired
    }

    componentDidMount() {
        const Url = ('http://wordpress.test/wordpress')
        const { featured_media } = this.props.post;

        axios.get(`${Url}/wp-json/wp/v2/media/${featured_media !== 0 ? featured_media : ''}`)
            .then(res => this.setState({
                getImageUrl: true,
                isLoaded: true
            }))
            .catch(err => console.log(err.response.data.message));
    }


    render() {
        const { id, title, content, date, featured_media, author } = this.props.post;
        const { isLoaded } = this.state;
        if (isLoaded) {
            return (
                <div className="card border-primary mb-3 post_container">
                    <div className="card-header">
                        <h2>{title.rendered}</h2>
                    </div>
                    <div className="card-body">
                        <p className="card-text" dangerouslySetInnerHTML={{ __html: content.rendered }} ></p>

                    </div>
                    <div className="card-footer">
                        <Moment fromNow>{date}</Moment>
                        <Link className="btn btn-secondary float-right" to={`/post/${id}/${featured_media}/${author}`}>Post details</Link>
                    </div>
                    <meta property="og:postition_home" content={id} />
                </div>
            )
        }
        return null
    }
}

export default PostItem
