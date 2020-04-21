import React, { useState } from 'react'
import { connect } from 'react-redux'
import { loginAttempt } from '../../services/authAPI'
import Field from '../Forms/Field'

const LoginPage = ({ loginAttempt, history }) => {

    const [credentials, setCredentials] = useState({ username: '', password: '' })
    const [error, setError] = useState('')

    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget
        setCredentials({ ...credentials, [name]: value })
    }

    const handleSubmit = async event => {
        event.preventDefault()

        try {
            await loginAttempt(credentials)
            history.replace('/')
        } catch (e) {
            setError('Invalid Credentials !')
        }
    }

    return (
      <section className='section'>
          <div className='container'>
              <h1 className='title'>
                  Login
              </h1>

              <form onSubmit={handleSubmit}>
                  <Field type='email' label='Email' name='username' onChange={handleChange} value={credentials.username}
                         error={error} placeholder='Enter your email'/>
                  <Field type='password' label='Password' name='password' onChange={handleChange}
                         value={credentials.password} error={error}/>
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

export default connect(null, { loginAttempt })(LoginPage)