import React from 'react'
import { createPaginationArray } from "../utilis/functions";
import { Link } from 'react-router-dom';

const Pagination = (props) => {

    const { currentPage, setCurrentPage, totalPages } = props;

    const paginationArray = createPaginationArray(currentPage, totalPages);
    const isThereNextPage = currentPage < totalPages;
    const isTherePreviousPage = currentPage > 1;

    const getPageLink = pageNo => {
        return `/page/${pageNo}`
    }

    return (
        <div className="pagination  pagination-lg">
            {isTherePreviousPage &&
                <Link
                    to={getPageLink(currentPage - 1)}
                    className="page-link"
                    onClick={() => setCurrentPage(currentPage - 1)}
                >&laquo;</Link>
            }

            {paginationArray &&
                paginationArray.map((item, index) => {
                    if ('...' !== item && currentPage !== item) {

                        return (
                            <div key={`${item}-${index}`}>
                                <Link
                                    to={getPageLink(item)}
                                    onClick={() => setCurrentPage(item)}
                                    className="page-item"
                                >
                                    <span className="page-link">{item}</span>
                                </Link>
                            </div>
                        );
                    } else {
                        return (
                            <span key={`${item}-${index}`} className={'...' === item ? 'page-link' : 'page-item active'}>
                                <span className={currentPage === item ? 'page-link' : ''}>{item}</span>
                            </span>
                        );
                    }

                })}

            {isThereNextPage &&
                <Link
                    to={getPageLink(currentPage + 1)}
                    className="page-link"
                    onClick={() => setCurrentPage(currentPage + 1)}
                >&raquo;</Link>
            }
        </div>
    )
}

export default Pagination
