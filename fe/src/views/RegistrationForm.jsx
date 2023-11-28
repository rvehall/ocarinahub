import { useState } from 'preact/hooks';
import { Link } from 'preact-router/match';
import { route } from 'preact-router';

import { Input } from '../components/Input/Input';
import { Button } from '../components/Button/Button';

export function RegistrationForm () {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    fullName: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    const data = {
      email: formData.email,
      username: formData.username,
      full_name: formData.fullName,
      password: formData.password,
      is_active: true,
      role: "collector",
    }
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/user/create', {
        method: "POST", 
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data)
      })
      
      login()
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  const login = async () => {
    const data = new FormData();
    data.append("username", formData.username);
    data.append("password", formData.password);
    
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
      console.log(token);
      document.cookie=`token=${token.access_token}`;
      console.log(document.cookie)
      route('/profile');
    } catch (error) {
      console.error('Registration failed:', error); 
    }
  }

  const { email, username, fullName, password } = formData;

  return (
    <form onSubmit={handleSubmit}>
      <h1>Registration</h1>
      <div>
        <Input
          type="email"
          name="email"
          value={email}
          onChange={handleInputChange}
          required={true}
          label="Email"
        />
      </div>
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
          type="text"
          name="fullName"
          value={fullName}
          onChange={handleInputChange}
          required={true}
          label="Full Name"
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
        <Button type="submit">Register</Button>
      </div>
      <div>
        Already have an account? <Link href="/login">Login</Link>
      </div>
    </form>
  );
};
