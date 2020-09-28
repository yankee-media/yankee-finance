import React from 'react';

// Router
import { withRouter } from 'react-router-dom';

// UI Components
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const VideoTile = ({ thumbnail, title }) => {
  return (
    <Paper style={{ padding: '8px', marginBottom: '16px' }}>
      <div style={{ overflow: 'hidden', position: 'relative', paddingTop: '56.25%', borderRadius: '4px', marginBottom: '6px' }}>
        <img className='link-like' style={{ width: '100%', position: 'absolute', top: '-16.5%', left: 0  }} src={thumbnail} alt={title} />
      </div>
      <Typography variant='subtitle2' className='link-like'>{title}</Typography>
    </Paper>
  )
}

export default withRouter(VideoTile);