import React from 'react';

// Redux
import { connect } from 'react-redux';

// UI Components
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import VideoTile from '../videos/VideoTile';
import CircularProgress from '@material-ui/core/CircularProgress';

const LatestVideos = ({ videos }) => {
  return (
    <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
      <div>
        <Typography variant='h5' style={{ textAlign: 'center', textDecoration: 'underline', textDecorationColor: '#f44336', marginBottom: '8px' }}>Latest Videos</Typography>
        {(videos && Array.isArray(videos) && videos.length > 0) ?
          (videos.map(video => <VideoTile key={video.etag} title={video.snippet.title} thumbnail={video.snippet.thumbnails.high.url} />)) : (
            <CircularProgress />
          )}
      </div>
    </Grid>
  )
}

const mapStateToProps = ({ appReducer }) => {
  return {
    videos: appReducer.latestVideos
  }
}

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(LatestVideos);