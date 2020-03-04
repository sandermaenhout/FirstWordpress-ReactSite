import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';

export class PostDetailPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            post: {},
            isLoaded: false,
            getImageUrl: '',
            imgUrl: '',
            author: '',
        }
    }


    componentDidMount() {
        const url = ('http://wordpress.test/wordpress');

        axios.get(`${url}/wp-json/wp/v2/posts/${this.props.match.params.id}`)
            .then(res => {
                this.setState({
                    post: res.data,
                    isLoaded: true
                })
            })
            .catch(err => console.log(err))

        if (this.props.match.params.featured_image !== "0") {
            axios.get(`${url}/wp-json/wp/v2/media/${this.props.match.params.featured_image}`)
                .then(result => {
                    this.setState({
                        imgUrl: result.data.media_details.sizes.full.source_url
                    })
                })
                .catch();
        }

        axios.get(`${url}/wp-json/wp/v2/users/${this.props.match.params.author}`)
            .then(res => {
                this.setState({
                    author: res.data
                })
            })
            .catch(err => console.log(err))


    }

    render() {
        const { post, isLoaded, imgUrl, author } = this.state;
        if (isLoaded) {
            return (
                <>
                    <Navbar />
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                        <li className="breadcrumb-item">{post.title.rendered}</li>
                    </ol>
                    <div>
                        <h2>{post.title.rendered}</h2>
                        <p>Posted by: {author.name}</p>
                        <div dangerouslySetInnerHTML={{ __html: post.content.rendered }}></div>
                        {this.props.match.params.featured_image === "0" ? '' : <img className="card-text post-content" src={imgUrl} alt={post.title.rendered} />}
                        <Link to="/">Go Back</Link>
                    </div>
                </>
            )
        }
        return null
    }
}

export default PostDetailPage;
