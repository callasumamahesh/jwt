import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Mock users database (for example purposes)
const users = [
  {
    username: 'admin',
    password: '$2a$10$zQ1DZWItbgWBHVYZPftgLuoFTGvR5PU.KC3JkFNuV14DqRXUkVotC', // 'password123' hashed
  }
];

export async function POST(req) {
  const { username, password } = await req.json(); // `req.json()` to parse the request body in the App Router.

  // Find user by username
  const user = users.find(user => user.username === username);

  if (!user) {
    return new Response(JSON.stringify({ message: 'Invalid username or password' }), { status: 401 });
  }

  // Check if the password is valid
  const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) {
//     return new Response(JSON.stringify({ message: 'Invalid username or password' }), { status: 401 });
//   }

  // Create a JWT token
  const token = jwt.sign({ username }, process.env.NEXT_PUBLIC_JWT_SECRET, { expiresIn: '1h' });

  // Send the token back to the client
  return new Response(JSON.stringify({ token }), { status: 200 });
}
