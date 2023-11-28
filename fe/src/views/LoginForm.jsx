import { useState } from 'preact/hooks';
import { Link } from 'preact-router/match';
import { useContext } from 'preact/hooks';
import { route } from 'preact-router';

import { AppContext } from '../AppContext';

import { Input } from '../components/Input/Input';
import { Button } from '../components/Button/Button';

export function LoginFrom () {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const { state, dispatch } = useContext(AppContext)


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    const data = new FormData();
    data.append("username", formData.username);
    data.append("password", formData.password);

    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/token', {
        method: "POST", 
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: data
      })
      const token = await response.json()
      document.cookie=`token=${token.access_token}`;
      route('/profile');
    } catch (error) {
      console.error('Registration failed:', error); 
    }
  };

  const { username, password } = formData;

  return (
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>
      <div>
        <Input
          type="text"
          name="username"
          value={username}
          onChange={handleInputChange}
          required={true}
          label="Username"
          />
      </div>
      <div>
        <Input
          type="password"
          name="password"
          value={password}
          onChange={handleInputChange}
          required={true}
          label="Password"
          />
      </div>
      <div>
        <Button type="submit">Login</Button>
      </div>
      <div>
        Don't have an account yet? <Link href="/register">Register</Link>
      </div>
    </form>
  );
};
