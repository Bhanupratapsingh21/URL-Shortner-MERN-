import jwt, { JwtPayload } from 'jsonwebtoken';

// Environment variable validations
const {
    ACCESS_TOKEN_SECRET,
    REFRESH_SECRET,
    REFRESH_TOKEN_EXPIRES_IN,
    ACCESS_TOKEN_SECRET_EXPIRES_IN,
} = process.env;

if (!ACCESS_TOKEN_SECRET || !REFRESH_SECRET || !REFRESH_TOKEN_EXPIRES_IN || !ACCESS_TOKEN_SECRET_EXPIRES_IN) {
    throw new Error("Missing environment variables for JWT configuration");
}

// Generate Access Token
async function generateAccessToken(user: object): Promise<string> {
    if (!ACCESS_TOKEN_SECRET || !ACCESS_TOKEN_SECRET_EXPIRES_IN) {
        throw new Error("Missing ACCESS_TOKEN_SECRET or ACCESS_TOKEN_SECRET_EXPIRES_IN");
    }
    return jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_SECRET_EXPIRES_IN });
}

// Generate Refresh Token
async function generateRefreshToken(user: object): Promise<string> {
    if (!REFRESH_SECRET) {
        throw new Error("Missing REFRESH_SECRET");
    }
    return jwt.sign(user, REFRESH_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRES_IN });
}

// Verify token with a given secret
async function verifyToken(token: string, secret: string): Promise<JwtPayload | string> {
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        throw new Error('Invalid token');
    }
}

// Verify Refresh Token
async function verifyTokenRefreshtoken(token: string): Promise<JwtPayload | string> {
    if (!REFRESH_SECRET) {
        throw new Error("Missing REFRESH_SECRET");
    }
    return verifyToken(token, REFRESH_SECRET);
}
if (!ACCESS_TOKEN_SECRET) {
    throw new Error("Missing ACCESS_TOKEN_SECRET");
}
// Verify Access Token
async function verifyTokenAccesstoken(token: string): Promise<JwtPayload | string> {
    if (!ACCESS_TOKEN_SECRET) {
        throw new Error("Missing ACCESS_TOKEN_SECRET");
    }
    return verifyToken(token, ACCESS_TOKEN_SECRET);
}



export {
    generateAccessToken,
    generateRefreshToken,
    verifyTokenRefreshtoken,
    verifyTokenAccesstoken
};