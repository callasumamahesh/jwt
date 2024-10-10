// 'use client'
// import { useState } from 'react';
// import axios from 'axios';
// import { useRouter } from 'next/navigation';
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"

// export default function LoginPage() {
//   const [formData, setFormData] = useState({ username: '', password: '' });
//   const [error, setError] = useState('');
//   const router = useRouter();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('/api/login', formData);
//       const { token } = res.data;

//       // Save token to localStorage or cookies
//       localStorage.setItem('token', token);

//       // Redirect user after login
//       router.push('/dashboard');
//     } catch (error) {
//       setError('Invalid username or password');
//     }
//   };

//   return (
//     <div>
//       <h1>Login</h1>
//       <form onSubmit={handleSubmit}>
//         <Input
//           type="text"
//           name="username"
//           placeholder="Username"
//           value={formData.username}
//           onChange={handleChange}
//         />
//         <Input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={formData.password}
//           onChange={handleChange}
//         />
//         <Button variant="outline">Button</Button>
//       </form>
//       {error && <p>{error}</p>}
//     </div>
//   );
// }

'use client'
import Link from "next/link"
import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"

export const description =
  "A login form with email and password. There's an option to login with Google and a link to sign up if you don't have an account."

function LoginForm() {
    const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    console.log('submitted')
    e.preventDefault();
    try {
      const res = await axios.post('/api/login', formData);
      const { token } = res.data;

      // Save token to localStorage or cookies
      localStorage.setItem('token', token);

      // Redirect user after login
      router.push('/dashboard');
    } catch (error) {
      setError('Invalid username or password');
    }
  };
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" 
          name='email'
          value={formData.email}
          onChange={handleChange} 
          required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" required  placeholder='******'
          name='password'
          value={formData.password}
          onChange={handleChange}/>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleSubmit}>Sign in</Button>
      </CardFooter>
    </Card>
  )
}

// Ensure you have a default export if this is a page component
export default LoginForm;
