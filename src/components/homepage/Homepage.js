import React from 'react';

// Custom Components
import HomepageTop from './HomepageTop';
import LatestPosts from './LatestPosts';
import LatestVideos from './LatestVideos';
import SearchAndPopular from './SearchAndPopular';

// UI Components
import Grid from '@material-ui/core/Grid';


const Homepage = props => {
  return (
    <div>
      <HomepageTop />
      <div style={{ maxWidth: '1230px', margin: '30px auto 0 auto', padding: '0 15px' }}>
        <Grid container spacing={2}>
          <LatestPosts />
          <LatestVideos />
          <SearchAndPopular />
        </Grid>
      </div>
    </div>
  )
}

export default Homepage;