import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { fetchAllStories } from '../slices/storySlice'
import moment from 'moment'
import { Link } from 'react-router-dom'
import Pagination from './Pagination.js'
import TextLoader from './Loaders/TextLoader'

const StoryListPage = ({ stories, storiesCount, isFetching, fetchAllStories }) => {

    const itemsPerPage = 10
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        fetchAllStories(itemsPerPage, currentPage)
    }, [currentPage])

    const handlePageChange = page => setCurrentPage(page)

    return (
      <section className="section">
          <div className="container">
              <h1 className="title">
                  Story List Page
              </h1>

              {!isFetching ? <>
                    {stories.map(story => (
                      <div className="card" key={story.id}>
                          <div className="card-content">
                              <p>{story.contentPreview}</p>
                          </div>
                          <div className="card-footer">
                              <p className="card-footer-item">{`Comments : ${story.commentsNumber}`}</p>
                              <p className="card-footer-item">{moment(story.createdAt).format('DD/MM/YYYY hh:mm:ss')}</p>
                              <p className="card-footer-item">{story.author.email}</p>
                              <Link to={`/stories/${story.id}`} className="card-footer-item ">See more</Link>
                          </div>
                      </div>

                    ))}

                    {storiesCount > itemsPerPage && (
                      <Pagination currentPage={currentPage}
                                  itemsPerPage={itemsPerPage}
                                  length={storiesCount}
                                  onPageChanged={handlePageChange}/>
                    )}
                </>
                :
                <TextLoader/>
              }
          </div>
      </section>
    )
}
const mapStateToProps = ({ storyReducer }) => ({
    stories: storyReducer.stories,
    storiesCount: storyReducer.storiesCount,
    isFetching: storyReducer.isFetching
})

export default connect(mapStateToProps, { fetchAllStories })(StoryListPage)