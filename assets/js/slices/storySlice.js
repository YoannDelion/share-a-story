import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    isFetching: false,
    stories: []
}

const storySlice = createSlice({
    name: 'stories',
    initialState,
    reducers: {
        fetchStories: state => { state.isFetching = true },
        fetchStoriesSuccess: (state, action) => {
            state.isFetching = false
            state.stories = action.payload
        },
        fetchStoriesError: state => {
            state.isFetching = false
        }
    }
})

export const { fetchStories, fetchStoriesSuccess, fetchStoriesError } = storySlice.actions

export default storySlice.reducer

export const fetchAllStories = () => async dispatch => {
    dispatch(fetchStories())
    try {
        const stories = await axios.get('http://127.0.0.1:8000/api/stories')
          .then(response => response.data['hydra:member'])
        dispatch(fetchStoriesSuccess(stories))
    } catch (e) {
        dispatch(fetchStoriesError())
    }
}