import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { AppBar, Avatar, Toolbar, Typography, Button } from '@material-ui/core';
import decode from 'jwt-decode';
import useStyles from './styles';
import memoriesLogo from '../../images/memoriesLogo.png';
import memoriesText from '../../images/memoriesText.png';

let userResult = null;

const Navbar = () => {
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  if (typeof user?.result === 'string') {
    userResult = decode(user.token);
  } else {
    userResult = user?.result;
  }

  const logout = () => {
    dispatch({ type: 'LOGOUT' });

    history.push('/');
    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location, user?.token]);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Link to="/" className='classes.brandContainer'>
        <img className={classes.image} src={memoriesText} alt="icon" height="45" />
        <img className={classes.image} src={memoriesLogo} alt="memories" height="40" />
      </Link>
      <Toolbar className={classes.toolbar} />
      {user ? (
        <div className={classes.profile}>
          <Avatar className={classes.purple} alt={userResult.name} src={userResult.picture}>{userResult.name.charAt(0)}</Avatar>
          <Typography className={classes.userName} variant="h6">{userResult.name}</Typography>
          <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
        </div>
      ) : (
        <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
      )
      }
    </AppBar >
  );
};

export default Navbar;
