import axios from 'axios'
import { STORIES_API } from '../config'
import { toast } from 'react-toastify'
import {
    addStory,
    addStoryError,
    addStorySuccess,
    fetchStories,
    fetchStoriesError,
    fetchStoriesSuccess, fetchStory, fetchStoryError, fetchStorySuccess
} from '../slices/storySlice'

export const fetchAllStories = (itemsPerPage, page) => async dispatch => {
    dispatch(fetchStories())
    try {
        const stories = await axios.get(`${STORIES_API}?itemsPerPage=${itemsPerPage}&page=${page}`)
          .then(response => response.data)
        dispatch(fetchStoriesSuccess(stories))
    } catch (e) {
        dispatch(fetchStoriesError())
    }
}

export const addNewStory = story => async dispatch => {
    dispatch(addStory())
    try {
        const data = await axios.post(STORIES_API, story)
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
        const story = await axios.get(`${STORIES_API}/${id}`)
          .then(response => response.data)
        dispatch(fetchStorySuccess(story))
    } catch (e) {
        dispatch(fetchStoryError())
    }
}
