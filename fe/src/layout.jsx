import { Router, route } from 'preact-router';
import { useReducer, useEffect } from 'preact/hooks';
import { jwtDecode } from "jwt-decode";

import "./index.css"

import { AppContext } from './AppContext';

import { Navbar } from './components/Navbar/Navbar';
import { Collection } from './views/Collection';
import { Home } from './views/Home';
import { Profile } from './views/Profile';
import { RegistrationForm } from './views/RegistrationForm';
import { LoginFrom } from './views/LoginForm';

const initialState = {
  recommendations: [{
    maker: "Night by Noble",
    img_link: "https://m.media-amazon.com/images/I/61GoUcaUWvS.jpg",
    product_link: "https://www.amazon.com/Night-Noble-Plastic-Ocarina-Black/dp/B008WYNVAW",
    chamber_count: 1,
    hole_count: 12,
    material: "plastic",
    type: "Alto C",
},
{
    maker: "Stein Ocarina",
    img_link: "http://www.steinocarina.com/webimages/136621587610_01.JPG",
    product_link: "http://www.steinocarina.com/productList.php?class=2&line=4",
    chamber_count: 1,
    hole_count: 12,
    material: "plastic",
    type: "Alto C/Soprano C"
},
{
    maker: "Imperial City Ocarina",
    img_link: "https://imperialcityocarina.com/images/cache/ac-12-hole-prod-desc-gallery.270.JPG",
    product_link: "https://imperialcityocarina.com/alto-12-hole-key-of-c-p341.html",
    chamber_count: 1,
    hole_count: 12,
    material: "ceramic",
    type: "Alto C"
}]
};
const reducer = (state, action) => {
  switch (action.type) {
    case 'setIsAuthed': 
      return { ...state, isAuthed: action.payload };
    case 'setRecommendations': 
      return { ...state, recommendations: action.payload };
    case 'setCollection': 
      return { ...state, collection: action.payload };
    case 'setUser': 
      return { ...state, user: action.payload };
    default: 
      throw new Error('Unexpected action');
  }
};

export function Layout() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // some method that returns a promise
  const checkAuth = () => {
    const cookie = document.cookie.split("=");
    if(cookie[0] === "") {
      return false;
    }
    const token = cookie[1];
    const decoded = jwtDecode(token);
    const exp = decoded["exp"]
    const date = new Date(exp * 1000)
    const now = new Date()

    dispatch({type: "setIsAuthed", payload: date > now})
    dispatch({type: "setUser", payload: decoded["account"]})
  }

 const handleRoute = async e => {
    checkAuth()

    switch (e.url) {
      case '/profile':
        if (!state.isAuthed) route('/', true);
        break;
      case '/collection':
        if (!state.isAuthed) route('/', true);
        break;
      case '/login':
        if (state.isAuthed) route('/profile', true);
        break;
      case '/register':
        if (state.isAuthed) route('/profile', true);
        break;
      case '/':
        console.log(state.isAuthed)
        if (state.isAuthed) route('/profile', true);
        break;
    }
  };

  return (
    <AppContext.Provider value={{state, dispatch}}>
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
      </AppContext.Provider>
    );
}