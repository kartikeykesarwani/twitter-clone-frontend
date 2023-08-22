import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthProvider from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Feed from './components/Feed';
import Auth from './components/Auth';
import Users from './components/Users';
import MyTweets from './components/MyTweets';
import CreateTweet from './components/CreateTweet';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<PrivateRoute />}>
            <Route path='Tweet' element={<CreateTweet />} />
          </Route>
          <Route path='/' element={<PrivateRoute />}>
            <Route path='MyTweets' element={<MyTweets />} />
          </Route>
          <Route path='/' element={<PrivateRoute />}>
            <Route path='Feed' element={<Feed />} />
          </Route>
          <Route path='/' element={<PrivateRoute />}>
            <Route path='Users' element={<Users />} />
          </Route>
          <Route path='/auth' element={<Auth />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
