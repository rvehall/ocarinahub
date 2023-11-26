import { Router, route } from 'preact-router';
import "./index.css"

import { Navbar } from './components/Navbar/Navbar';

import { Collection } from './views/Collection';
import { Home } from './views/Home';
import { Profile } from './views/Profile';
import RegistrationForm from './views/RegistrationForm';
import LoginFrom from './views/LoginForm';

export function Layout() {
  // some method that returns a promise
  // const isAuthenticated = () => {}

 const handleRoute = async e => {
    switch (e.url) {
      case '/profile':
        // const isAuthed = await isAuthenticated();
        const isAuthed = true;
        if (!isAuthed) route('/', true);
        break;
    }
  };

  return (
    <>
      <Navbar/>
      <main  class="container">
        <Router onChange={handleRoute}>
          <Home path="/" />
          <Profile path="/profile" />
          <Collection path="/collection" />
          <RegistrationForm path="/register"/>
          <LoginFrom path="/login"/>
        </Router>
      </main>
    </>
    );
}