import jwt from 'jsonwebtoken';

export async function POST(req) {
  try {
    const body = await req.json(); // Parse the incoming request body
    const { token } = body;

    if (!token) {
      return new Response(JSON.stringify({ message: 'Token is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Verify the token using the secret
    const decoded = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET);

    // Return the decoded username
    return new Response(JSON.stringify({ user: decoded.username }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error verifying token:', error);

    return new Response(JSON.stringify({ message: 'Invalid token' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
