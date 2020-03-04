import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import PostDetailPage from './Components/PostDetailPage';
import Home from './Containers/Home';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import CreatePost from './Components/CreatePost';
import Blog from './Components/Blog';
import Page from './Components/Page';

function App() {

  return (
    <Router>
      <>
        <Route exact path="/" component={Home} />
        <Route path="/post/:id/:featured_image/:author" component={PostDetailPage} />
        <Route path="/blogs" component={Blog} />
        <Route path="/page/:id" component={Page} />
        <Route path="/login" component={Login} />
        <Route path="/dashboard/:username" component={Dashboard} />
        <Route path="/createpost" component={CreatePost} />
      </>
    </Router>

  );
}

export default App;
