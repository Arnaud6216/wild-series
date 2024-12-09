// Some data to make the trick

const categories = [
  {
    id: 1,

    name: "Comédie",
  },

  {
    id: 2,

    name: "Science-Fiction",
  },
];

// Declare the actions

import type { RequestHandler } from "express";

const browse: RequestHandler = (req, res) => {
  res.json(categories);
};

const read: RequestHandler = (req, res) => {
  const parsedId = Number.parseInt(req.params.id);

  const categorie = categories.find((c) => c.id === parsedId);

  if (categorie != null) {
    res.json(categorie);
  } else {
    res.json(categories);
  }
};

// Export them to import them somewhere else

export default { browse, read };
