import express from 'express';
import { indexPage, 
	 	 authorPage, addAuthor, updateAuthorPreferences,
		 manuscriptPage, addManuscript
} from '../controllers';

const indexRouter = express.Router();

indexRouter.get('/', indexPage);
indexRouter.get('/authors', authorPage);
indexRouter.post('/authors', addAuthor);
indexRouter.patch('/authors', updateAuthorPreferences);

indexRouter.get('/manuscripts', manuscriptPage);
indexRouter.post('/manuscripts', addManuscript);



export default indexRouter;


