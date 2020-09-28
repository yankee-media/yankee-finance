import React from 'react';

// UI Components
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const LatestPosts = props => {
  return (
    <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
      <div>
        <Typography variant='h5' style={{textAlign: 'center', textDecoration: 'underline', textDecorationColor: '#f44336', marginBottom: '8px'}}>Latest Posts</Typography>
      </div>
    </Grid>
  )
}

export default LatestPosts;