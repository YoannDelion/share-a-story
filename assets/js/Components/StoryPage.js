import React, { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'
import { Link } from 'react-router-dom'

const StoryPage = ({ match }) => {

    const { id = 'new' } = match.params
    const [isFetching, setIsFetching] = useState(false)
    const [story, setStory] = useState({
        content: '',
        author: {},
        categories: [],
        createdAt: '',
        commentsNumber: 0,
        comments: []
    })

    const fetchStory = async id => {
        try {
            const { content, author, categories, createdAt, commentsNumber, comments } = await axios.get(`http://127.0.0.1:8000/api/stories/${id}`)
              .then(response => response.data)

            setStory({ content, author, categories, createdAt, commentsNumber, comments })
            setIsFetching(false)
        } catch (e) {
            console.error('An error occured !')
        }
    }

    useEffect(() => {
        setIsFetching(true)
        fetchStory(id)
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
                              <p className="card-footer-item">{story.author.email}</p>
                              <p className="card-footer-item">{moment(story.createdAt).format('DD/MM/YYYY hh:mm:ss')}</p>
                              <p className="card-footer-item">{story.categories.map(category => <span key={category.id}
                                                                                                      className="tag is-primary">{category.name}</span>
                              )}</p>
                          </div>
                      </div>

                      <div className="section">
                          {story.commentsNumber > 0 ? (
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

export default StoryPage
