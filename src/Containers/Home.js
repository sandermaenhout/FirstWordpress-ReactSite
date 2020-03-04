import React, { Component } from 'react'
import Navbar from '../Components/Navbar'
import Posts from '../Components/Posts'

export class Home extends Component {
    render() {
        return (
            <>
                <Navbar />
                <Posts />
            </>
        )
    }
}

export default Home
