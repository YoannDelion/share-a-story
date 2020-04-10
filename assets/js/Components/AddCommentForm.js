import React, { useState } from 'react'
import { connect } from 'react-redux'
import { addStoryComment } from '../slices/storySlice'

const AddCommentForm = ({ story, addStoryComment, errors }) => {

    const [comment, setComment] = useState({ content: '', story: story['@id'] })

    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget
        setComment({ ...comment, [name]: value })
    }

    const handleSubmit = event => {
        event.preventDefault()

        addStoryComment(comment)
        setComment({ ...comment, content: '' })
    }

    return (
      <>
          <p className="subtitle">Add a new comment</p>
          <form onSubmit={handleSubmit}>
              <div className="field">
                  <div className="control">
                      <textarea name="content"
                                className={'textarea' + (errors.hasOwnProperty('content') ? ' is-danger' : '')}
                                maxLength="255"
                                value={comment.content} onChange={handleChange}/>
                  </div>
                  {errors.content && <p className="help is-danger">{errors.content}</p>}
              </div>
              <div className="field">
                  <div className="control">
                      <button className="button is-primary">Submit</button>
                  </div>
              </div>
          </form>
      </>
    )
}

const mapStateToProps = ({ storyReducer }) => ({
    story: storyReducer.story,
    errors: storyReducer.errors
})

export default connect(mapStateToProps, { addStoryComment })(AddCommentForm)