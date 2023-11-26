import { useState } from 'preact/hooks';
import { Link } from 'preact-router/match';

import { Input } from '../components/Input/Input';
import { Button } from '../components/Button/Button';

const LoginFrom = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    const data = {
      username: formData.username,
      password: formData.password,
    }
    e.preventDefault();
    try {
      const response = fetch('http://localhost:8000/token', {
        method: "POST", 
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data)
      })
      console.log('Registration successful:', response); 
      setFormData({
        username: '',
        password: ''
      });
    } catch (error) {
      console.error('Registration failed:', error); // Handle error
      // Handle error state or display error message to the user
    }
  };

  const { email, username, fullName, password } = formData;

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

export default LoginFrom;
