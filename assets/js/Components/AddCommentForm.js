import React, { useState } from 'react'
import { connect } from 'react-redux'
import { addStoryComment } from '../slices/storySlice'

const AddCommentForm = ({ story, addStoryComment }) => {

    const [comment, setComment] = useState({ content: '', story: story['@id'] })
    const [errors, setErrors] = useState({ content: '' })

    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget
        setComment({ ...comment, [name]: value })
    }

    const handleSubmit = async event => {
        event.preventDefault()
        try {
            await addStoryComment(comment)
            setComment({ ...comment, content: '' })
        } catch ({ response }) {
            response.data.violations.map(({ propertyPath, message }) => {
                setErrors({ errors, [propertyPath]: message })
            })
        }
    }

    return (
      <>
          <p className="subtitle">Add a new comment</p>
          <form onSubmit={handleSubmit}>
              <div className="field">
                  <div className="control">
                      <textarea name="content"
                                className={'textarea' + (errors.content && ' is-danger')}
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
    story: storyReducer.story
})

export default connect(mapStateToProps, { addStoryComment })(AddCommentForm)