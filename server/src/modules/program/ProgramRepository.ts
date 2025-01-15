import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

type Program = {
  id: number;
  title: string;
};

class ProgramRepository {
  async create(program: Omit<Program, "id">) {
    const [result] = await databaseClient.query<Result>(
      "insert into program (title) values (?)",
      [program.title],
    );
    return result.insertId;
  }

  async read(id: number) {
    // Execute the SQL SELECT query to retrieve a specific program by its ID

    const [rows] = await databaseClient.query<Rows>(
      "select * from program where id = ?",
      [id],
    );

    // Return the first row of the result, which represents the program
    return rows[0] as Program;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all program from the "program" table
    const [rows] = await databaseClient.query<Rows>("select * from program");

    // Return the array of programs
    return rows as Program[];
  }

  async update(program: Program) {
    const [result] = await databaseClient.query<Result>(
      "update program set title = ? where id = ?",
      [program.title, program.id],
    );

    return result.affectedRows;
  }

  async delete(id: number) {
    // Execute the SQL DELETE query to delete an existing program from the "program" table
    const [result] = await databaseClient.query<Result>(
      "delete from program where id = ?",
      [id],
    );

    // Return how many rows were affected
    return result.affectedRows;
  }
}

export default new ProgramRepository();
