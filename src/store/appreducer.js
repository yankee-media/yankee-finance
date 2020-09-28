import * as types from './actiontypes';

export const appReducerInit = {
  latestVideos: []
}

const appReducer = (state = appReducerInit, action) => {
  switch (action.type) {
    case types.UPDATE_LATEST_VIDEOS:
      return {
        ...state,
        latestVideos: action.videos
      }
    case types.UPDATE_SEARCH_RESULTS:
      return {
        ...state
      }
    default:
      return state
  }
}

export default appReducer;