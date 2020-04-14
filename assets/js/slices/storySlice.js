import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import {toast} from 'react-toastify'

const initialState = {
    isFetching: false,
    stories: [],
    storiesCount: 0,
    story: {}
}

const storySlice = createSlice({
    name: 'stories',
    initialState,
    reducers: {
        fetchStories: state => { state.isFetching = true },
        fetchStoriesSuccess: (state, action) => {
            state.isFetching = false
            state.stories = action.payload['hydra:member']
            state.storiesCount = action.payload['hydra:totalItems']
        },
        fetchStoriesError: state => {
            state.isFetching = false
        },
        addStory: state => { state.isFetching = true },
        addStorySuccess: (state, action) => {
            state.isFetching = false
            state.stories = [...state.stories, action.payload]
        },
        addStoryError: state => {state.isFetching = false},
        fetchStory: state => { state.isFetching = true },
        fetchStorySuccess: (state, action) => {
            state.isFetching = false
            state.story = action.payload
        },
        fetchStoryError: state => {
            state.isFetching = false
        },
        addComment: state => {
            state.errors = {}
        },
        addCommentSuccess: (state, action) => {
            state.story.comments.push(action.payload)
        },
        addCommentError: () => {}
    }
})

export const {
    fetchStories, fetchStoriesSuccess, fetchStoriesError, addStory, addStorySuccess, addStoryError,
    fetchStory, fetchStorySuccess, fetchStoryError, addComment, addCommentSuccess, addCommentError
} = storySlice.actions

export default storySlice.reducer

// Services Wrappers
export const fetchAllStories = (itemsPerPage, page) => async dispatch => {
    dispatch(fetchStories())
    try {
        const stories = await axios.get(`http://127.0.0.1:8000/api/stories?itemsPerPage=${itemsPerPage}&page=${page}`)
          .then(response => response.data)
        dispatch(fetchStoriesSuccess(stories))
    } catch (e) {
        dispatch(fetchStoriesError())
    }
}

export const addNewStory = story => async dispatch => {
    dispatch(addStory())
    try {
        const data = await axios.post('http://127.0.0.1:8000/api/stories', story)
          .then(response => response.data)
        dispatch(addStorySuccess(data))
        toast.success('Your story has been shared!')
    } catch (e) {
        dispatch(addStoryError())
    }
}

export const fetchUniqueStory = id => async dispatch => {
    dispatch(fetchStory())
    try {
        const story = await axios.get(`http://127.0.0.1:8000/api/stories/${id}`)
          .then(response => response.data)
        dispatch(fetchStorySuccess(story))
    } catch (e) {
        dispatch(fetchStoryError())
    }
}

export const addStoryComment = comment => async dispatch => {
    dispatch(addComment())
    try {
        const data = await axios.post('http://127.0.0.1:8000/api/comments', comment)
          .then(response => response.data)
        dispatch(addCommentSuccess(data))
        toast.success('Comment published')
    } catch (e) {
        dispatch(addCommentError())
        return Promise.reject(e)
    }
}