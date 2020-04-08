import React, { useState } from 'react'
import axios from 'axios'
import { addNewStory } from '../slices/storySlice'
import { connect } from 'react-redux'

const AddStoryPage = ({ addNewStory, history }) => {
    const [story, setStory] = useState({ content: '' })
    const [errors, setErrors] = useState({ content: '' })

    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget
        setStory({ ...story, [name]: value })
    }

    const handleSubmit = async event => {
        event.preventDefault()

        try {
            await addNewStory(story)
            setErrors({})
            //success
            history.replace('/stories')
        } catch ({ response }) {
            // response.data.violations.map(({ propertyPath, message }) => {
            //     setErrors({ ...errors, [propertyPath]: message })
            // })
        }
    }

    return (
      <section className='section'>
          <div className='container'>
              <h1 className='title'>Share my story</h1>

              <form onSubmit={handleSubmit}>
                  <div className="field">
                      <div className="control">
                          <textarea className={'textarea' + (errors.content && ' is-danger')}
                                    placeholder="Start writing your story here"
                                    name='content'
                                    value={story.content} onChange={handleChange}/>
                      </div>
                      {errors.content && <p className="help is-danger">{errors.content}</p>}
                  </div>
                  <div className='field'>
                      <div className='control'>
                          <button type='submit' className='button is-primary'>Submit</button>
                      </div>
                  </div>
              </form>
          </div>
      </section>
    )
}

export default connect(null, { addNewStory })(AddStoryPage)