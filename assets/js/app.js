import React from 'react'
import ReactDOM from 'react-dom'

import '../css/app.css'
import 'bulma'

const App = () => {
    return (
      <section className="section">
          <div className="container">
              <h1 className="title">
                  Hello World
              </h1>
              <p className="subtitle">
                  My first website with <strong>Bulma</strong>!
              </p>
          </div>
      </section>
    )
}

ReactDOM.render(<App/>, document.getElementById('app'))


