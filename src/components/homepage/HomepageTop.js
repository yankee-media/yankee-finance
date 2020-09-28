import React, { useState } from 'react';

// UI Components
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// Icons
import DoubleArrow from '@material-ui/icons/DoubleArrow';

const HomepageTop = props => {
  const [isClicked, updateClicked] = useState({0: false, 1: false, 2: false});
  return (
    <Grid style={{ height: '300px' }} container spacing={0}>
      <Grid className='homepage-top-wrapper' style={{ height: '100%' }} item xs={4} sm={4} md={4} lg={4} xl={4}>
        <div onClick={() => updateClicked({0: !isClicked[0], 1: false, 2: false})} className={isClicked[0] ? 'homepage-top-reduce' : 'homepage-top-open'} style={{ backgroundColor: '#f44336', height: '100%', position: 'relative', textAlign: 'center' }}>
          <img className='homepage-top-scale-img' style={{ position: 'absolute', transform: 'translate(-50%)' }} src='https://placehold.it/500x500' alt='piggy bank' />
          <Typography className='homepage-top-scale' variant='h6' style={{ position: 'absolute', width: '100%', textAlign: 'center' }}>Save</Typography>
          <DoubleArrow className='homepage-top-arrow' style={{ position: 'absolute', right: '5px', transform: 'translate(0, -12px)' }} />
        </div>
      </Grid>
      <Grid className='homepage-top-wrapper' style={{ height: '100%' }} item xs={4} sm={4} md={4} lg={4} xl={4}>
        <div onClick={() => updateClicked({0: false, 1: !isClicked[1], 2: false})} className={isClicked[1] ? 'homepage-top-reduce' : 'homepage-top-open'} style={{ backgroundColor: '#ef5350', height: '100%', position: 'relative', textAlign: 'center' }}>
          <img className='homepage-top-scale-img' style={{ position: 'absolute', transform: 'translate(-50%)' }} src='https://placehold.it/500x500' alt='manage money' />
          <Typography className='homepage-top-scale' variant='h6' style={{ position: 'absolute', width: '100%', textAlign: 'center' }}>Manage</Typography>
          <DoubleArrow className='homepage-top-arrow' style={{ position: 'absolute', right: '5px', transform: 'translate(0, -12px)' }} />
        </div>
      </Grid>
      <Grid className='homepage-top-wrapper' style={{ height: '100%' }} item xs={4} sm={4} md={4} lg={4} xl={4}>
        <div onClick={() => updateClicked({0: false, 1: false, 2: !isClicked[2]})} className={isClicked[2] ? 'homepage-top-reduce' : 'homepage-top-open'} style={{ backgroundColor: '#e53935', height: '100%', position: 'relative', textAlign: 'center' }}>
          <img className='homepage-top-scale-img' style={{ position: 'absolute', transform: 'translate(-50%)' }} src='https://placehold.it/500x500' alt='investment graph' />
          <Typography className='homepage-top-scale' variant='h6' style={{ position: 'absolute', width: '100%' }}>Invest</Typography>
          <DoubleArrow className='homepage-top-arrow' style={{ position: 'absolute', right: '5px', transform: 'translate(0, -12px)' }} />
        </div>
      </Grid>
    </Grid>
  )
}

export default HomepageTop;