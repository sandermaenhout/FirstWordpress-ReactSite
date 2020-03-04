import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from './Pagination';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

const BlogPost = (props) => {

    const { pageId } = props;

    const [currentPage, setCurrentPage] = useState(pageId);
    const [totalPages, settotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [errMessage, setError] = useState('');
    const [posts, setPosts] = useState({});


    useEffect(() => {
        const siteUrl = 'http://wordpress.test/wordpress';

        setLoading(true);

        axios.get(`${siteUrl}/wp-json/wp/v2/posts?page=${currentPage}`)
            .then((res, err) => {
                setLoading(false);
                if (200 === res.status) {
                    setPosts(res.data);
                    settotalPages(res.headers['x-wp-totalpages']);
                } else {
                    setError(err);
                }
            })
            .catch(err => {
                setError(err);
            });

    }, [currentPage]);

    const getPosts = posts => {
        return posts.map(post => (
            <div key={post.id} className="card border-primary mb-3 post_container">
                <h2 className="card-header">{post.title.rendered}</h2>
                <div className="card-body">
                    <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
                </div>


                <div className="card-footer">
                    <small><Moment fromNow>{post.date}</Moment></small>
                    <Link className="btn btn-secondary float-right" to={`/post/${post.id}/${post.featured_media}/${post.author}`}>Post details</Link>
                </div>
            </div>
        ))
    }

    return (
        <>
            <div className="container blog" style={{ overflow: 'hidden' }}>

                {(!loading && null !== posts && posts.length) ? (
                    <>
                        {getPosts(posts)}
                        <Pagination
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            totalPages={totalPages}
                        />
                    </>
                ) : (
                        <div>{errMessage}</div>
                    )}
            </div>
        </>
    )
}

export default BlogPost
