import jwt from "jsonwebtoken";

export const generateToken = (
  userId,
  email,
  jwtSecretKey,
  expiresIn = "1d"
) => {
  return jwt.sign(
    {
      userId,
      email,
    },
    jwtSecretKey,
    { expiresIn }
  );
};
