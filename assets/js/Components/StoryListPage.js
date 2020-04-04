import React, { useState } from 'react'
import { connect } from 'react-redux'
import { fetchAllStories } from '../slices/storySlice'
import moment from 'moment'

const StoryListPage = ({ stories, isFetching, fetchAllStories }) => {

    useState(() => {
        fetchAllStories()
    }, [stories])

    return (
      <section className="section">
          <div className="container">
              <h1 className="title">
                  Story List Page
              </h1>

              {!isFetching ? stories.map(story => (
                  <div className="card" key={story.id}>
                      <div className="card-content">
                          <p>{story.contentPreview}</p>
                      </div>
                      <div className="card-footer">
                          <p className="card-footer-item">{`Comments : ${story.commentsNumber}`}</p>
                          <p className="card-footer-item">{moment(story.createdAt).format('DD/MM/YYYY hh:mm:ss')}</p>
                          <p className="card-footer-item">{story.author.email}</p>
                      </div>
                  </div>
                ))
                :
                <p>Loading...</p>
              }


          </div>
      </section>
    )
}
const mapStateToProps = ({ storyReducer }) => ({
    stories: storyReducer.stories,
    isFetching: storyReducer.isFetching
})

export default connect(mapStateToProps, { fetchAllStories })(StoryListPage)