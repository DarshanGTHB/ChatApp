import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  const isDev = process.env.NODE_ENV === "development";
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: !isDev,
    sameSite: isDev ? "Lax" : "None",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return token;
};
