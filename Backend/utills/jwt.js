import jwt from 'jsonwebtoken';

const {
  ACCESS_TOKEN_SECRET,
  REFRESH_SECRET,
  REFRESH_TOKEN_EXPIRES_IN,
  ACCESS_TOKEN_SECRET_EXPIRES_IN
} = process.env;

if (!ACCESS_TOKEN_SECRET || !REFRESH_SECRET || !REFRESH_TOKEN_EXPIRES_IN || !ACCESS_TOKEN_SECRET_EXPIRES_IN) {
  throw new Error("Missing environment variables for JWT configuration");
}

async function generateAccessToken(user) {
  return jwt.sign({ ...user }, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_SECRET_EXPIRES_IN });
}

async function generateRefreshToken(user) {
  return jwt.sign({ ...user }, REFRESH_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRES_IN });
}

async function verifyToken(token, secret) {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    throw new Error('Invalid token');
  }
}

async function verifyTokenRefreshtoken(token) {
  return verifyToken(token, REFRESH_SECRET);
}

async function verifyTokenAccesstoken(token) {
  return verifyToken(token, ACCESS_TOKEN_SECRET);
}

export { generateAccessToken, generateRefreshToken, verifyTokenRefreshtoken, verifyTokenAccesstoken };