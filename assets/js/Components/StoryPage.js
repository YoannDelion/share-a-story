import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { Link } from 'react-router-dom'
import AddCommentForm from './AddCommentForm'
import { fetchUniqueStory } from '../slices/storySlice'

const StoryPage = ({ match, story, isFetching, fetchUniqueStory }) => {

    const { id } = match.params

    useEffect(() => {
        fetchUniqueStory(id)
    }, [id])

    return (
      <section className='section'>
          <div className='container'>
              <h1 className='title'>The Story</h1>

              {!isFetching ? (
                  <>
                      <div className="card">
                          <div className="card-content">
                              <p>
                                  {story.content}
                              </p>
                          </div>
                          <div className="card-footer">
                              <p className="card-footer-item">{story.author ? story.author.email : 'Loading...'}</p>
                              <p className="card-footer-item">{moment(story.createdAt).format('DD/MM/YYYY hh:mm:ss')}</p>
                              <p className="card-footer-item">{story.categories ? story.categories.map(category => (
                                <span key={category.id} className="tag is-primary">{category.name}</span>
                              )) : 'Loading...'
                              }</p>
                          </div>
                      </div>

                      <div className="section">
                          <div className="columns">
                              <div className="column">
                                  {story.comments && story.comments.length > 0 ? (
                                      <>
                                          <p className="subtitle">Comments</p>
                                          {story.comments.map(comment => <div className="card" key={comment.id}>
                                              <div className="card-content">
                                                  <p>{comment.content}</p>
                                              </div>
                                              <div className="card-footer">
                                                  <p
                                                    className="card-footer-item">{moment(comment.createdAt).format('DD/MM/YYYY hh:mm:ss')}</p>
                                                  <p className="card-footer-item">{comment.author.email}</p>
                                              </div>
                                          </div>)}
                                      </>)
                                    :
                                    <p className="subtitle">No comments</p>}
                              </div>
                              <div className="column">
                                  <AddCommentForm/>
                              </div>
                          </div>

                      </div>
                  </>
                )
                :
                <p>Loading...</p>
              }

              <Link to='/stories'>Go back</Link>
          </div>
      </section>
    )
}

const mapStateToProps = ({ storyReducer }) => ({
    story: storyReducer.story,
    isFetching: storyReducer.isFetching
})

export default connect(mapStateToProps, { fetchUniqueStory })(StoryPage)
