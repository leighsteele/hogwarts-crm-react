import React from 'react';
import LoginPage from './pages/LoginPage';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import MainPage from './pages/MainPage';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';
import './styles.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/login">
            <LoginPage />
          </Route>
          <Route path="/signup">
            <SignupPage />
          </Route>
          <Route path="/home">
            <MainPage />
          </Route>
          <Route path="/student/profile" component={ProfilePage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
