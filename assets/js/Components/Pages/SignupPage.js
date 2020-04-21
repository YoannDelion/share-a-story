import React, { useState } from 'react'
import Field from '../Forms/Field'
import UsersAPI from '../../services/usersAPI'
import { toast } from 'react-toastify'

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
            await UsersAPI.create(user)
            setErrors({})
            toast.success('Account created!')
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
                  <Field type='email' label='Email' name='email' value={user.email} error={errors.email}
                         onChange={handleChange}/>
                  <Field type='password' label='Password' name='password' value={user.password} error={errors.password}
                         onChange={handleChange}/>
                  <Field type='password' label='Confirm Password' name='confirmPassword' value={user.confirmPassword}
                         error={errors.confirmPassword} onChange={handleChange}/>
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