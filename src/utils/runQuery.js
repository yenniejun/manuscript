import { createTables, insertIntoTables, initialize } from './queryFunctions';

(async () => {
  await initialize();
  await createTables();
  await insertIntoTables();
})();