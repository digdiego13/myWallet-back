import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as userService from "../repositories/userRepository.js";

async function signUp({ email, password, name }) {
  const existingUserWithGivenEmail = await userService.selectEmail({ email });

  if (existingUserWithGivenEmail.rows[0]) {
    return undefined;
  }

  const hashedPassword = bcrypt.hashSync(password, 12);

  const user = await userService.insertUser({ name, email, hashedPassword });

  if (user === undefined) {
    return undefined;
  }

  return user;
}

async function signIn({ email, password }) {
  const user = await userService.selectEmail({ email });

  if (!user.rows[0] || !bcrypt.compareSync(password, user.rows[0].password)) {
    return false;
  }

  const token = jwt.sign(
    {
      id: user.rows[0].id,
    },
    process.env.JWT_SECRET
  );

  return token;
}

export { signIn, signUp };
