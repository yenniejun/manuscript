import { pool } from '../models/pool';
import {
  createAuthorsTable,
  createManuscriptsTable,
  insertAuthors,
  insertManuscripts,
  dropAuthorsTable,
  dropManuscriptsTable,
  init
} from './queries';

export const executeQueryArray = async arr => new Promise(resolve => {
  const stop = arr.length;
  arr.forEach(async (q, index) => {
    await pool.query(q);
    if (index + 1 === stop) resolve();
  });
});

export const initialize = () => executeQueryArray([ init ])
export const dropManuscriptsTables = () => executeQueryArray([ dropManuscriptsTable ]);
export const dropAuthorsTables = () => executeQueryArray([ dropAuthorsTable ]);
// export const dropTables = () => executeQueryArray([ dropManuscriptsTable, dropAuthorsTable ]);
export const createTables = () => executeQueryArray([ createAuthorsTable, createManuscriptsTable ]);
export const insertAuthorsIntoTables = () => executeQueryArray([ insertAuthors ]);
export const insertManuscriptsIntoTables = () => executeQueryArray([ insertManuscripts ]);