import React, { useEffect } from 'react'
import moment from 'moment'

const CommentCard = ({ comment }) => (
  <div className="card">
      <div className="card-content">
          <p>{comment.content}</p>
      </div>
      <div className="card-footer">
          <p
            className="card-footer-item">{moment(comment.createdAt).format('DD/MM/YYYY hh:mm:ss')}</p>
          <p className="card-footer-item">{comment.author.email}</p>
      </div>
  </div>
)

export default CommentCard