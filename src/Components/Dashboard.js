import React, { Component } from 'react'
import Navbar from './Navbar'
import axios from 'axios';

import { getImage } from './../functions/users';
import { Link } from 'react-router-dom';

export class Dashboard extends Component {

    state = {
        user: {},
        isLoaded: false
    }

    componentDidMount() {
        const authToken = localStorage.getItem('token');
        axios.get(`http://wordpress.test/wordpress/wp-json/wp/v2/users/me`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            }
        })
            .then(res => {
                this.setState({
                    user: res.data,
                    isLoaded: true
                })
            })
            .catch(err => console.log(err));
    }


    render() {
        return (
            <>
                <Navbar />
                <div className="jumbotron dashboard_top_container">
                    <div >
                        <h2 className="display-4">Welkom, {this.state.user.name}!</h2>
                        <p className="lead">Welkom op uw dashboard! Hier kunt u nieuwe posts toevoegen en aanpassen.</p>
                        <p>{this.state.user.description}</p>
                    </div>
                    <div className="avatar">
                        {getImage(this.state.user)}
                    </div>
                </div>
                <section className="btn_link_container">
                    <div className="card border-info mb-3 card_buttons">
                        <div className="card-body">
                            <h3 className="card-title">Create a post!</h3>
                            <Link to="/createpost" className="btn btn-primary btn-lg">+</Link>
                        </div>
                    </div>
                    <div className="card border-info mb-3 card_buttons">
                        <div className="card-body">
                            <h3 className="card-title">Edit a post!</h3>
                            <button className="btn btn-primary btn-lg">Edit</button>
                        </div>
                    </div>
                </section>

            </>
        )
    }
}

export default Dashboard
