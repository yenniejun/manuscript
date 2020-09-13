import express from 'express';
import { indexPage, authorPage, manuscriptPage } from '../controllers';

const indexRouter = express.Router();

indexRouter.get('/', indexPage);
indexRouter.get('/manuscripts', manuscriptPage)
indexRouter.get('/authors', authorPage)

export default indexRouter;