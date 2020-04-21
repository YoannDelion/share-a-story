import React, { useState } from 'react'
import { connect } from 'react-redux'
import { addStoryComment } from '../services/commentsAPI'
import Textarea from './Forms/Textarea'

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
      <form onSubmit={handleSubmit}>
          <legend className="subtitle">Add a new comment</legend>
          <Textarea onChange={handleChange} error={errors.content} value={comment.content} name='content'
                    maxlength={255}/>
          <div className="field">
              <div className="control">
                  <button className="button is-primary">Submit</button>
              </div>
          </div>
      </form>
    )
}

const mapStateToProps = ({ storyReducer }) => ({
    story: storyReducer.story
})

export default connect(mapStateToProps, { addStoryComment })(AddCommentForm)