import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { AppBar, Avatar, Toolbar, Typography, Button } from '@material-ui/core';
import decode from 'jwt-decode';
import useStyles from './styles';
import memories from '../../images/memories.png';

const Navbar = () => {
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  let userResult = null;

  // console.log('User.Result: ' + user?.result._id);
  // console.log('Token length: ' + user?.token.length);

  // const userName = decode(user.token).name;
  // const userPhoto = decode(user.token).picture;

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
  }, [location]);

  // console.log(user.result);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className='classes.brandContainer'>
        <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">Memories</Typography>
        <img className={classes.image} src={memories} alt="memories" height="60" />
      </div>
      <Toolbar className={classes.toolbar} />
      {user ? (
        <div className={classes.profile}>
          <Avatar className={classes.purple} alt={decode(user.token).name} src={decode(user.token).picture}>{decode(user.token).name.charAt(0)}</Avatar>
          <Typography className={classes.userName} variant="h6">{decode(user.token).name}</Typography>
          <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
        </div>
      ) : (
        <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
      )}
    </AppBar>
  );
};

export default Navbar;
