import axios from 'axios'
import { COMMENTS_API } from '../config'
import { toast } from 'react-toastify'
import { addComment, addCommentError, addCommentSuccess } from '../slices/storySlice'

export const addStoryComment = comment => async dispatch => {
    dispatch(addComment())
    try {
        const data = await axios.post(COMMENTS_API, comment)
          .then(response => response.data)
        dispatch(addCommentSuccess(data))
        toast.success('Comment published')
    } catch (e) {
        dispatch(addCommentError())
        return Promise.reject(e)
    }
}