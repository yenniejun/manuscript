import express from 'express';
import { indexPage, 
	 	 getAuthors, addAuthor, updateAuthorPreferences,
		  getManuscripts, addManuscript, updateManuscript,
		  getManuscriptById, getManuscriptsByAuthorId,
} from '../controllers';

const indexRouter = express.Router();
indexRouter.get('/', indexPage);

indexRouter.get('/authors', getAuthors);
indexRouter.post('/authors', addAuthor);
indexRouter.patch('/authors', updateAuthorPreferences);
// indexRouter.get('/manuscripts/:authorid', getManuscriptsByAuthorId);


indexRouter.get('/manuscripts', getManuscripts);
indexRouter.get('/manuscripts/:id', getManuscriptById);
indexRouter.post('/manuscripts', addManuscript);
indexRouter.patch('/manuscripts', updateManuscript);

export default indexRouter;


