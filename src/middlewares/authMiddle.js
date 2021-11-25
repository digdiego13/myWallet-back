import jwt from "jsonwebtoken";
async function authMiddle(req, res, next) {
  const authorization = req.headers.authorization || "";
  const token = authorization.split("Bearer ")[1];

  if (!token) {
    return res.sendStatus(401);
  }

  let user;
  console.log("Ihul");

  try {
    user = jwt.verify(token, process.env.JWT_SECRET);
    req.locals = user;
  } catch {
    return res.sendStatus(401);
  }
  next();
}

export { authMiddle };
