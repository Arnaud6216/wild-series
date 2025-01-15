import ProgramRepository from "./ProgramRepository";

// Declare the action

import type { RequestHandler } from "express";

const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all categories
    const programs = await ProgramRepository.readAll();

    // Respond with the categories in JSON format
    res.json(programs);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

//*****************************************************
const read: RequestHandler = async (req, res, next) => {
  try {
    // Fetch a specific program based on the provided ID
    const programId = Number(req.params.id);
    const program = await ProgramRepository.read(programId);

    // If the program is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the program in JSON format
    if (program == null) {
      res.sendStatus(404);
    } else {
      res.json(program);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

//*****************************************************

const edit: RequestHandler = async (req, res, next) => {
  try {
    const program = {
      id: Number(req.params.id),
      title: req.body.title,
    };

    const affectedRows = await ProgramRepository.update(program);

    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
};

//*****************************************************

const add: RequestHandler = async (req, res, next) => {
  try {
    const newProgram = {
      title: req.body.title,
    };
    const insertId = await ProgramRepository.create(newProgram);

    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

//*****************************************************

const destroy: RequestHandler = async (req, res, next) => {
  try {
    // Delete a specific program based on the provided ID
    const programId = Number(req.params.id);

    await ProgramRepository.delete(programId);

    // Respond with HTTP 204 (No Content) anyway
    res.sendStatus(204);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};
// Export it to import it somewhere else

export default { read, browse, edit, add, destroy };
