import connection from "../database.js";

async function selectEmail({ email }) {
  const emailName = await connection.query(
    `SELECT * FROM "users" WHERE "email"=$1`,
    [email]
  );

  return emailName;
}

async function insertUser({ name, email, hashedPassword }) {
  const user = await connection.query(
    `INSERT INTO "users" ("name", "email", "password") VALUES ($1, $2, $3) RETURNING *`,
    [name, email, hashedPassword]
  );

  return user.rows[0].name;
}

export { insertUser, selectEmail };
