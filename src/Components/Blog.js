import React from 'react'
import Navbar from './Navbar'
import BlogPost from './BlogPost'

function Blog() {
    return (
        <>
            <Navbar />
            <div>
                <BlogPost pageId={1} />
            </div>
        </>
    )
}

export default Blog
