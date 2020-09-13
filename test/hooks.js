// When our test starts, Mocha finds this file and executes it before running any test file. It executes the before hook to create the database and insert some items into it. The test files then run after that. Once the test is finished, Mocha runs the after hook in which we drop the database. This ensures that each time we run our tests, we do so with clean and new records in our database.


import {
  initialize,
  createTables,
  insertAuthorsIntoTables,
  insertManuscriptsIntoTables,
  dropAuthorsTables,
  dropManuscriptsTables
} from '../src/utils/queryFunctions';

before(async () => {
  await initialize();
  await createTables();
  await insertAuthorsIntoTables();
  await insertManuscriptsIntoTables();
});

after(async () => {
  await dropManuscriptsTables();
  await dropAuthorsTables();
});