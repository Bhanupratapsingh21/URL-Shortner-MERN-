import bcrypt from 'bcrypt';

const saltRounds = 21;

// Hash the password
async function hashPassword(password) {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.error("Error hashing password:", error);
    throw new Error("Password hashing failed");
  }
}

// Validate the password
async function validatePassword(password, hashedPassword) {
  try {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  } catch (error) {
    console.error("Error validating password:", error);
    throw new Error("Password validation failed");
  }
}

export { hashPassword, validatePassword };
