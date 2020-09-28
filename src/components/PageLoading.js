import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

const PageLoading = props => {
  let styles = null;
  if (props.absolute) {
    styles = {
      zIndex: 99999,
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: '100%',
      height: '100%'
    }
  } else {
    styles = {
      zIndex: 99999,
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: '100%',
      height: '100%'
    }
  }
  return (
    <div style={{position: 'relative', top: 0, left: 0, width: '100%', height: '100%'}}>
    <div style={styles}>
      <div  style={{width: '100%', textAlign: 'center', marginTop: '25%'}}>
        <CircularProgress size={100} color='primary' />
        <Typography variant='h2' style={{marginTop: '20px'}} color='primary'>
          Yankee Finance
        </Typography>
      </div>
    </div>
    </div>
  );
}

export default PageLoading;