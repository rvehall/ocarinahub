import './Navbar.css';
import { route } from 'preact-router'; 
import { useState } from 'preact/hooks';
import { Link } from 'preact-router/match';

export function Navbar() {
  return (
    <nav class="navbar">
      <div class="container">
        <ul class="navList">
          <li>
              <Link activeClassName="active" href="/">Home</Link>
          </li>
          <li>
              <Link activeClassName="active" href="/profile">Profile</Link>
          </li>
          <li>
              <Link activeClassName="active" href="/collection">Collection</Link>
          </li>
          <li class="navRight">
              <Link activeClassName="active" href="/login">Login</Link>
          </li>
          <li class="navRight">
              <Link activeClassName="active" href="/register">Register</Link>
          </li>
          <li class="navRight">
              <Link>Signout</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}
