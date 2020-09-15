import express from 'express';
import { indexPage, 
	 	 authorPage, addAuthor,
		 manuscriptPage, addManuscript
} from '../controllers';

const indexRouter = express.Router();

indexRouter.get('/', indexPage);
indexRouter.get('/manuscripts', manuscriptPage);
indexRouter.get('/authors', authorPage);

indexRouter.post('/authors', addAuthor);
indexRouter.post('/manuscripts', addManuscript);

export default indexRouter;


