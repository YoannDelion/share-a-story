import { createSlice } from '@reduxjs/toolkit'

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