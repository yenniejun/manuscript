import express from 'express';
import { indexPage, loginLocal, 
		  getAuthor, getAuthors, getAuthorManuscripts,
		  createAuthor, updateAuthorPreferences,
		  deleteAuthor,
		  getManuscript, getManuscripts, addManuscript, updateManuscript
		} from '../controllers';
import  Auth from '../middleware/Auth';

const indexRouter = express.Router();
indexRouter.get('/', indexPage);

indexRouter.post('/authors', createAuthor);
indexRouter.post('/authors/login', loginLocal);

indexRouter.get('/authors', Auth.verifyToken, getAuthors);
indexRouter.get('/authors/:id', Auth.verifyToken, getAuthor);
indexRouter.patch('/authors', Auth.verifyToken, updateAuthorPreferences);

indexRouter.get('/authors/:id/manuscripts', Auth.verifyToken, getAuthorManuscripts);
indexRouter.delete('authors/:id', Auth.verifyToken, deleteAuthor);

indexRouter.get('/manuscripts', Auth.verifyToken, getManuscripts);
indexRouter.get('/manuscripts/:id', Auth.verifyToken, getManuscript);
indexRouter.post('/manuscripts', Auth.verifyToken, addManuscript);
indexRouter.patch('/manuscripts', Auth.verifyToken, updateManuscript);



export default indexRouter;


