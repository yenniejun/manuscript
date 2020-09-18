import express from 'express';
import { indexPage, 
	 	 getAuthor, getAuthors, addAuthor, updateAuthorPreferences,
		getManuscript, getManuscripts, addManuscript, updateManuscript
		} from '../controllers';

const indexRouter = express.Router();
indexRouter.get('/', indexPage);

indexRouter.get('/authors', getAuthors);
indexRouter.get('/authors/:id', getAuthor);
indexRouter.post('/authors', addAuthor);
indexRouter.patch('/authors', updateAuthorPreferences);
// indexRouter.get('/manuscripts/:authorid/manuscripts', getManuscriptsByAuthorId);


indexRouter.get('/manuscripts', getManuscripts);
indexRouter.get('/manuscripts/:id', getManuscript);
indexRouter.post('/manuscripts', addManuscript);
indexRouter.patch('/manuscripts', updateManuscript);

export default indexRouter;


