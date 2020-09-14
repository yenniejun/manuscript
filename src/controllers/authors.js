import Model from '../models/model';

const authorModel = new Model('authors');

export const authorPage = async (req, res) => {
  try {
    const data = await authorModel.select('name, myManuscripts');
    res.status(200).json({ authors: data.rows });
  } catch (err) {
    res.status(200).json({ authors: err.stack });
  }
};

export const addAuthor = async (req, res) => {
  const { name, email, writingLevel, manuscriptCap } = req.body;
  const columns = 'name, email, writingLevel, manuscriptCap';
  const values = `'${name}', '${email}', '${writingLevel}',\
   '${manuscriptCap}'`;
  try {
    const data = await authorModel.insertWithReturn(columns, values);
    res.status(200).json({ authors: data.rows });
  } catch (err) {
    res.status(200).json({ authors: err.stack });
  }
};


// TO DO 
// 1. Patch author preferences (name, email, etc)
// 2. Patch author manuscripts: myManuscripts, myDrafts, masterManuscriptMatches (metadata)