import React from 'react'
import Navbar from './Navbar'
import BlogPost from './BlogPost'

const Page = (props) => {

    const { id } = props.match.params;

    return (
        <>
            <Navbar />
            <div>
                <BlogPost pageId={id} />
            </div>
        </>
    )
}

export default Page
