import React, { useState } from 'react'
import { connect } from 'react-redux'
import { loginAttempt } from '../slices/authSlice'

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
                  <div className='field'>
                      <label className='label'>Email</label>
                      <div className='control has-icons-left has-icons-right'>
                          <input onChange={handleChange} className={'input' + (error && ' is-danger')} type='email'
                                 placeholder='Enter your email'
                                 name='username'
                                 value={credentials.username}/>
                          <span className='icon is-small is-left'>
                              <i className='fas fa-envelope'> </i>
                            </span>
                          {error && <span className='icon is-small is-right'>
                            <i className='fas fa-exclamation-triangle'> </i>
                          </span>}
                      </div>
                      {error && <p className='help is-danger'>{error}</p>}
                  </div>
                  <div className='field'>
                      <label className='label'>Password</label>
                      <div className='control has-icons-left has-icons-right'>
                          <input onChange={handleChange} className={'input' + (error && ' is-danger')} type='password'
                                 placeholder='Password'
                                 name='password'
                                 value={credentials.password}/>
                          <span className='icon is-small is-left'>
                            <i className='fas fa-unlock-alt'> </i>
                          </span>
                          {error && <span className='icon is-small is-right'>
                            <i className='fas fa-exclamation-triangle'> </i>
                          </span>}
                      </div>
                      {error && <p className='help is-danger'>{error}</p>}
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

export default connect(null, { loginAttempt })(LoginPage)