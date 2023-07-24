import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  allowExitOnIdle: true,
});

export const getTodos = async () => {
  const { rows } = await pool.query("SELECT * FROM todos");
  return rows;
};

export const getTodo = async (id) => {
  const text = "SELECT * FROM todos WHERE id = $1";
  const { rows } = await pool.query(text, [id]);
  if (rows.length === 0) {
    throw { code: "404" };
  }
  return rows[0];
};

export const createTodo = async ({ title, description }) => {
  if (!title || !description) {
    throw { code: "400" };
  }

  const text =
    "INSERT INTO todos (title, description) values ($1, $2) RETURNING *";
  const { rows } = await pool.query(text, [title, description]);
  return rows[0];
};
