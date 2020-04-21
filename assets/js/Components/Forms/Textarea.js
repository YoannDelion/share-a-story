import React from 'react'

const Textarea = ({ name, onChange, error, maxlength = '', value, placeholder = '' }) => {
    return (
      <div className="field">
          <div className="control">
              <textarea name={name}
                        className={'textarea' + (error && ' is-danger')}
                        maxLength={maxlength}
                        value={value} onChange={onChange}
                        placeholder={placeholder}
              />
          </div>
          {error && <p className="help is-danger">{error}</p>}
      </div>)
}

export default Textarea