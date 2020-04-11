import React from 'react'

const Pagination = ({ currentPage, itemsPerPage, length, onPageChanged }) => {

    const pageCount = Math.ceil(length / itemsPerPage),
      pages = [],
      pagesWithDots = [],
      delta = 2,
      left = currentPage - delta,
      right = currentPage + delta + 1

    for (let i = 1; i <= pageCount; i++) {
        if (i === 1 || i === pageCount || i >= left && i < right) {
            pages.push(i)
        }
    }

    let l
    for (let i of pages) {
        if (l) {
            if (i - l === 2) {
                pagesWithDots.push(l + 1)
            } else if (i - l !== 1) {
                pagesWithDots.push('...')
            }
        }
        pagesWithDots.push(i)
        l = i
    }

    return (
      <nav className="pagination is-centered" role="navigation" aria-label="pagination">
          <button className="pagination-previous" disabled={currentPage === 1}
                  onClick={() => onPageChanged(currentPage - 1)}>&laquo;</button>
          <button className="pagination-next" disabled={currentPage === pageCount}
                  onClick={() => onPageChanged(currentPage + 1)}>&raquo;</button>
          <ul className="pagination-list">
              {pagesWithDots.map((page, index) => (
                  page === '...' ? (
                    <li key={index}>
                        <span className="pagination-ellipsis">&hellip;</span>
                    </li>) : (
                    <li key={index}>
                        <button className={'pagination-link' + (currentPage === page ? ' is-current' : '')}
                                onClick={() => onPageChanged(page)}>
                            {page}
                        </button>
                    </li>)
                )
              )}
          </ul>
      </nav>
    )
}

export default Pagination