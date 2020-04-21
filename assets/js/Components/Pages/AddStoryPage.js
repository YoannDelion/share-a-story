import React, { useState } from 'react'
import { addNewStory } from '../../services/storiesAPI'
import { connect } from 'react-redux'
import Textarea from '../Forms/Textarea'

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
                  <Textarea name='content' value={story.content} error={errors.content} onChange={handleChange}
                            placeholder='Start writing your story here'/>
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