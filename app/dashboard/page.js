'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('/api/verifytoken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      })
        .then(res => res.json())
        .then(data => {
          if (data.user) {
            setUser(data.user);
          } else {
            router.push('/');
          }
        })
        .catch(error => {
          console.error('Error verifying token:', error);
          router.push('/');
        });
    } else {
      router.push('/');
    }
  }, [router]);

  return (
    <div>
      <h1>Dashboard</h1>
      {user ? <p>Welcome, {user}</p> : <p>Loading...</p>}
    </div>
  );
}
