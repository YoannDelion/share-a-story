import React from 'react'

const Field = ({ type = 'text', label, name, value, onChange, placeholder = '', error = '' }) => {

    const ICONS = {
        email: 'fas fa-envelope',
        password: 'fas fa-unlock-alt'
    }

    return (
      <div className='field'>
          <label htmlFor={name} className='label'>{label}</label>
          <div className='control has-icons-left has-icons-right'>
              <input onChange={onChange} className={'input' + (error && ' is-danger')} type={type}
                     placeholder={placeholder || label}
                     name={name}
                     value={value}
                     id={name}/>
              <span className='icon is-small is-left'>
                              <i className={ICONS[type]}> </i>
                            </span>
              {error && <span className='icon is-small is-right'>
                            <i className='fas fa-exclamation-triangle'> </i>
                          </span>}
          </div>
          {error && <p className='help is-danger'>{error}</p>}
      </div>
    )
}

export default Field