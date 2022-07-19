//@ts-ignore
import pool from "../config/database";

export type BaseCourse = {
  id: number;
  name: string;
  instructor_id: number;
};

async function index() {
  //@ts-ignore
  const connection = await pool.connect();
  const result = await connection.query("SELECT * FROM course");
  connection.release();
  return result.rows;
}

async function add(course: Omit<BaseCourse, "id">): Promise<BaseCourse> {
  //@ts-ignore
  const connection = await pool.connect();
  const result = await connection.query(
    "INSERT INTO course (name, instructor_id) VALUES ($1, $2) RETURNING *;",
    [course.name, course.instructor_id]
  );
  connection.release();
  return result.rows[0];
}




async function remove(id: number): Promise<void> {
  //@ts-ignore
  const connection = await pool.connect();
  await connection.query("DELETE FROM course WHERE id = $1", [id]);
  return;
}

async function get(id: number): Promise<BaseCourse> {
  //@ts-ignore
  const connection = await pool.connect();
  const result = await connection.query(
    "SELECT * FROM course WHERE id = $1",
    [id]
  );
  connection.release();
  if (result.rowCount === 0) throw new Error("BaseCourse not found");
  return result.rows[0];
}


export const CourseTable = {
  index,
  add,
  remove,
  get,
};

