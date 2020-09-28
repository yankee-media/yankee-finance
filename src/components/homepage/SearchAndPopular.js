import React, { useState } from 'react';

// Icons
import Search from '@material-ui/icons/Search';

// UI Components
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';

const SearchAndPopular = props => {
  const [searchValue, setSearchValue] = useState('');
  return (
    <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
      <div>
        <Typography variant='h5' style={{ textAlign: 'center', textDecoration: 'underline', textDecorationColor: '#f44336', marginBottom: '8px' }}>Search</Typography>
        <form onSubmit={e => {
          e.preventDefault();
          console.log('search');
        }}>
        <TextField
          variant='outlined'
          fullWidth
          value={searchValue}
          onChange={e => {
            setSearchValue(e.target.value);
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'><IconButton onClick={() => {
                console.log('search');
              }}><Search /></IconButton></InputAdornment>),
          }} />
          </form>
      </div>
      <div style={{marginTop: '20px'}}>
        <Typography variant='h5' style={{ textAlign: 'center', textDecoration: 'underline', textDecorationColor: '#f44336', marginBottom: '8px' }}>Popular Posts</Typography>
      </div>
    </Grid>
  )
}

export default SearchAndPopular;