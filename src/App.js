import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import PostDetails from './components/PostDetails/PostDetails';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));

  console.log('User: ', user);

  return (
    <GoogleOAuthProvider clientId="239350411522-uc35vv3goif01pc32m1i0ba6uc3qbd9h.apps.googleusercontent.com">
      <BrowserRouter>
        <Container maxWidth="xl">
          <Navbar />
          <Switch>
            <Route path="/" exact component={() => <Redirect to="/posts" />} />
            <Route path="/posts" exact component={Home} />
            <Route path="/posts/search" exact component={Home} />
            <Route path="/posts/:id" exact component={PostDetails} />
            <Route path="/auth" exact component={() => (user === null ? <Auth /> : <Redirect to="/posts" />)} />
          </Switch>
        </Container>
      </BrowserRouter>
    </GoogleOAuthProvider >
  );
}

export default App;
