import * as types from './actiontypes';

const updateLatestVideos = result => {
  return {
    type: types.UPDATE_LATEST_VIDEOS,
    videos: result
  }
}

export const getLatestVideos = () => {
  return dispatch => {
    fetch(`https://www.googleapis.com/youtube/v3/search?key=${process.env.REACT_APP_YOUTUBE_KEY}&channelId=${process.env.REACT_APP_CHANNEL_ID}&part=snippet&type=video&order=date&maxResults=10`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => res.json()).then(result => {
        dispatch(updateLatestVideos(result.items || []));
      }).catch(error => {
        console.error(error);
      });
  }
}

export const searchPosts = query => {
  return dispatch => {
    console.log(query);
  }
}