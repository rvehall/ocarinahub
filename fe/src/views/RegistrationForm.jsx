import { useState } from 'preact/hooks';
import { Link } from 'preact-router/match';

import { Input } from '../components/Input/Input';
import { Button } from '../components/Button/Button';

const RegistrationForm = () => {
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
      const response = fetch('http://localhost:8000/user/create', {
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
      console.log('Registration successful:', response); 
      setFormData({
        email: '',
        username: '',
        fullName: '',
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

export default RegistrationForm;
