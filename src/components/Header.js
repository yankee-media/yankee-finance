import React from 'react';

// Util
import { BACKGROUND_COLOR, MAIN_LOGO } from '../util/constants';

// Router
import { Link, withRouter } from 'react-router-dom';

// Icons
import AccountBalance from '@material-ui/icons/AccountBalance';
import CreditCard from '@material-ui/icons/CreditCard';
import Money from '@material-ui/icons/Money';
import MonetizationOn from '@material-ui/icons/MonetizationOn';
import InsertChart from '@material-ui/icons/InsertChart';

// UI Components
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

const Header = props => {
  return (
    <AppBar position='absolute' style={{ backgroundColor: BACKGROUND_COLOR }}>
      <Toolbar style={{ height: '75px' }}>
        <div style={{ display: 'flex', margin: '5px auto', maxWidth: '1230px', width: '100%', padding: '0 15px' }}>
          <Link to={'/'}><div style={{ width: '180px', marginRight: '10px', display: 'inline-block' }}><div style={{ width: '180px' }}><img style={{ height: '60px' }} src={MAIN_LOGO} alt='main logo' /></div></div></Link>
          <span style={{ flex: 1 }}></span>
          <Button onClick={() => { props.history.push('/banking') }} style={{ width: '100%' }}><AccountBalance color='primary' style={{ marginRight: '10px', position: 'relative', top: '-2px' }} />Banking</Button>
          <span style={{ flex: 1 }}></span>
          <Button onClick={() => { props.history.push('/loan-debt') }} style={{ width: '100%' }}><Money color='primary' style={{ marginRight: '10px', position: 'relative', top: '-2px' }} />Loans & Debt</Button>
          <span style={{ flex: 1 }}></span>
          <Button onClick={() => { props.history.push('/credit-cards') }} style={{ width: '100%' }}><CreditCard color='primary' style={{ marginRight: '10px', position: 'relative', top: '-2px' }} />Credit Cards</Button>
          <span style={{ flex: 1 }}></span>
          <Button onClick={() => { props.history.push('/investing') }} style={{ width: '100%' }}><MonetizationOn color='primary' style={{ marginRight: '10px', position: 'relative', top: '-2px' }} />Investing</Button>
          <span style={{ flex: 1 }}></span>
          <Button onClick={() => { props.history.push('/tools') }} style={{ width: '100%' }}><InsertChart color='primary' style={{ marginRight: '10px', position: 'relative', top: '-2px' }} />Tools</Button>
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default withRouter(Header);