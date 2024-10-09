// 'use client';
// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';

// export default function DashboardPage() {
//   const [user, setUser] = useState(null);
//   const router = useRouter();

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       fetch('/api/verifytoken', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ token }),
//       })
//         .then(res => res.json())
//         .then(data => {
//           if (data.user) {
//             setUser(data.user);
//           } else {
//             router.push('/');
//           }
//         })
//         .catch(error => {
//           console.error('Error verifying token:', error);
//           router.push('/');
//         });
//     } else {
//       router.push('/');
//     }
//   }, [router]);

//   return (
//     <div>
//       <h1>Dashboard</h1>
//       {user ? <p>Welcome, {user}</p> : <p>Loading...</p>}
//     </div>
//   );
// }


// DashboardPage.js
'use client';
import { useRouter } from 'next/navigation';// Adjust the path accordingly
import { useContent } from '../components/context';
import { useEffect } from 'react';

export default function DashboardPage() {
  const router = useRouter();
  const { data, loading, error } = useContent();

  // useEffect(() => {
  //   if (error) {
  //     router.push('/');
  //   }
  // }, [error, router]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Dashboard</h1>
      {data.user ? <p>Welcome, {data.user}</p> : <p>Unauthorized access</p>}
    </div>
  );
}

