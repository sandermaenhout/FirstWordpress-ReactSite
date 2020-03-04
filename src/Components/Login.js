import React, { Component } from 'react'
import Navbar from './Navbar'
import axios from 'axios';
import { Redirect } from 'react-router-dom';

export class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            userNiceName: '',
            userEmail: '',
            loggedIn: false,
            loading: false,
            userFound: false,
            errorFound: false,
            error: ''
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        const siteUrl = 'http://wordpress.test/wordpress';

        const loginData = {
            username: this.state.username,
            password: this.state.password
        }

        this.setState({ loading: true }, () => {
            axios.post(`${siteUrl}/wp-json/jwt-auth/v1/token`, loginData)
                .then(res => {
                    if (undefined === res.data.token) {

                        this.setState({
                            error: res.data.message,
                            loading: false
                        });
                        return;
                    }
                    localStorage.setItem('token', res.data.token);
                    localStorage.setItem('userName', res.data.user_nicename);

                    this.setState({
                        userFound: true,
                        loading: false,
                        token: res.data.token,
                        userNiceName: res.data.user_nicename,
                        userEmail: res.data.user_email,
                        loggedIn: true,
                        userId: res.data
                    })
                })
                .catch(err => {
                    this.setState({
                        error: err,
                        loading: false,
                        errorFound: true
                    })
                });
        })
    }

    handleOnChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        const { username, password, loggedIn, userNiceName, userFound, errorFound } = this.state;

        const user = userNiceName ? userNiceName : localStorage.getItem('userName')

        if (loggedIn || localStorage.getItem('token')) {
            return <Redirect to={`/dashboard/${user}`} noThrow />
        } else {
            return (
                <>
                    <Navbar />
                    <form onSubmit={this.handleSubmit} className="form-container">
                        <label className="form-group">Username:</label>
                        <input
                            type="text"
                            name="username"
                            value={username}
                            onChange={this.handleOnChange}
                            placeholder="Username"
                            className={`form-control ${userFound ? 'is-valid' : errorFound ? 'is-invalid' : ''}`}
                        />
                        <br />
                        <label className="form-group">Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={this.handleOnChange}
                            placeholder="Password"
                            className={`form-control ${userFound ? 'is-valid' : errorFound ? 'is-invalid' : ''}`}
                        />
                        <button className="btn btn-primary mt-4" type="submit">Login</button>
                    </form>
                </>
            )
        }
    }
}

export default Login
