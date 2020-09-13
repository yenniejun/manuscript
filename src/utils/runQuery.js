import { initialize, createTables, insertAuthorsIntoTables, 
	insertManuscriptsIntoTables } from './queryFunctions';

(async () => {
  await initialize();
  await createTables();
  await insertAuthorsIntoTables();
  await insertManuscriptsIntoTables();
})();