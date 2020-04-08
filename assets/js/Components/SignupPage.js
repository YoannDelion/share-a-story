import React, { useState } from 'react'
import axios from 'axios'

const SignupPage = ({ history }) => {

    const [user, setUser] = useState({ email: '', password: '', confirmPassword: '' })
    const [errors, setErrors] = useState({ email: '', password: '', confirmPassword: '' })

    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget
        setUser({ ...user, [name]: value })
    }

    const handleSubmit = async event => {
        event.preventDefault()

        const apiErrors = {}
        if (user.password !== user.confirmPassword) {
            apiErrors.password = apiErrors.confirmPassword = 'Password and confirmation don\'t match !'
            setErrors({ ...errors, ...apiErrors })
            return
        }

        try {
            await axios.post('http://127.0.0.1:8000/api/users', user)
            setErrors({})
            //success
            history.replace('/login')
        } catch ({ response }) {
            response.data.violations.map(({ propertyPath, message }) => {
                apiErrors[propertyPath] = message
            })
            setErrors({ ...errors, ...apiErrors })
        }
    }

    return (
      <section className='section'>
          <div className='container'>
              <h1 className='title'>
                  Sign up!
              </h1>

              <form onSubmit={handleSubmit}>
                  <div className="field">
                      <label htmlFor='email' className="label">Email</label>
                      <div className="control has-icons-left has-icons-right">
                          <input onChange={handleChange} className={'input' + (errors.email && ' is-danger')}
                                 type="email" placeholder="Email input"
                                 name='email' value={user.email}/>
                          <span className="icon is-small is-left"><i className="fas fa-envelope"> </i></span>
                          {errors.email && <span className="icon is-small is-right"><i
                            className="fas fa-exclamation-triangle"> </i></span>}
                      </div>
                      {errors.email && <p className="help is-danger">{errors.email}</p>}
                  </div>
                  <div className="field">
                      <label className="label" htmlFor='password'>Password</label>
                      <div className="control has-icons-left has-icons-right">
                          <input onChange={handleChange} type="password"
                                 className={'input' + (errors.password && ' is-danger')} placeholder="P@ssword"
                                 name='password' value={user.password}/>
                          <span className="icon is-small is-left"><i className="fas fa-unlock-alt"> </i></span>
                          {errors.password && <span className="icon is-small is-right"><i
                            className="fas fa-exclamation-triangle"> </i></span>}
                      </div>
                      {errors.password && <p className="help is-danger">{errors.password}</p>}
                  </div>
                  <div className="field">
                      <label className="label" htmlFor="confirmPassword">Confirm password</label>
                      <div className="control has-icons-left has-icons-right">
                          <input onChange={handleChange} type="password"
                                 className={'input' + (errors.confirmPassword && ' is-danger')}
                                 placeholder="Confirm P@ssword"
                                 name="confirmPassword" value={user.confirmPassword}/>
                          <span className="icon is-small is-left"><i className="fas fa-unlock-alt"> </i></span>
                          {errors.confirmPassword && <span className="icon is-small is-right"><i
                            className="fas fa-exclamation-triangle"> </i></span>}
                      </div>
                      {errors.confirmPassword && <p className="help is-danger">{errors.confirmPassword}</p>}
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

export default SignupPage