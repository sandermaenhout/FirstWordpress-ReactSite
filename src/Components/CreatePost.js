import React, { Component } from 'react'
import LoaderP from '../assets/images/loaderpost.gif';
import axios from 'axios';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

export class CreatePost extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            content: '',
            postCreated: false,
            loading: false,
            message: ''
        }

    }

    componentDidMount() {
    }


    handleForm = e => {
        e.preventDefault();
        this.setState({
            loading: true
        })

        const formData = {
            title: this.state.title,
            content: this.state.content,
            status: 'publish'
        };

        const siteUrl = 'http://wordpress.test/wordpress';
        const authToken = localStorage.getItem('token');

        axios.post(`${siteUrl}/wp-json/wp/v2/posts`, formData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            }
        })
            .then(res => {
                console.log(res);
                this.setState({
                    loading: false,
                    postCreated: !!res.data.id,
                    message: res.data.id ? 'New post created!' : ''
                })
            })
            .catch(err => {
                this.setState({
                    loading: false,
                    message: err.response.data.message
                })
            })
    }

    handleOnChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        const { loading, message, postCreated, title, content } = this.state;
        const user = localStorage.getItem('userName');
        return (
            <>
                <Navbar />
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item"><Link to={`/dashboard/${user}`}>Dashboard</Link></li>
                    <li className="breadcrumb-item active">Create post</li>
                </ol>
                <form onSubmit={this.handleForm} className="post_container">
                    <legend className="mb-4">Create Post</legend>

                    {message ? <div className={`alert ${postCreated ? 'alert alert-dismissible alert-success' : 'alert alert-dismissible alert-danger'}`}>{message}</div> : ''}

                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input type="text" name="title" onChange={this.handleOnChange} className={`form-control ${postCreated ? 'is-valid' : ''}`} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="my-post-content">Content</label>
                        <textarea rows="10" name="content" id="my-post-content" onChange={this.handleOnChange} className={`form-control ${postCreated ? 'is-valid' : ''}`}></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">Create post</button>
                    {loading && <img className="loaderpost" src={LoaderP} alt="Loader" />}
                </form>
                {content && title ? (
                    <>
                        <div>
                            <h2 className="title">Example</h2>
                        </div>
                        <div className="card border-primary mb-3 post_container">
                            <div className="card-header">
                                <h2>{title}</h2>
                            </div>
                            <div className="card-body">
                                <p className="card-text">{content}</p>

                            </div>
                            <div className="card-footer">
                                <p>an minute ago</p>
                                <div className="btn btn-secondary float-right">Post details</div>
                            </div>
                        </div>
                    </>
                ) : (
                        ''
                    )}
            </>
        )
    }
}

export default CreatePost
