import './Navbar.css';
import { Link } from 'preact-router/match';
import { useContext } from 'preact/hooks';

import { AppContext } from '../../AppContext';

export const Navbar = () => {
  const { state, dispatch } = useContext(AppContext)

  return (
    <nav class="navbar">
      <div class="container">
        <ul class="navList">
          <li>
              <Link activeClassName="active" href="/">Home</Link>
          </li>
          {state.isAuthed &&
            <><li>
                <Link activeClassName="active" href="/profile">Profile</Link>
            </li>
            <li>
                <Link activeClassName="active" href="/collection">Collection</Link>
            </li></>
          }
          {!state.isAuthed &&
          <>
            <li class="navRight">
                <Link activeClassName="active" href="/login">Login</Link>
            </li>
            <li class="navRight">
                <Link activeClassName="active" href="/register">Register</Link>
            </li>
          </>}
          {state.isAuthed &&
            <li class="navRight">
                <Link>Signout</Link>
            </li>
          }
        </ul>
      </div>
    </nav>
  )
}
