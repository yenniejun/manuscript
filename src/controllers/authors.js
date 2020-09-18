import Model from '../models/model';

const authorModel = new Model('authors');

export const getAuthors = async (req, res) => {
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
    const data = await authorModel.insertWithReturn('author', columns, values);
    res.status(200).json({ authors: data.rows });
  } catch (err) {
    res.status(200).json({ authors: err.stack });
  }
};

export const updateAuthorPreferences = async (req, res) => {
  var columns = [];
  var values = [];

  ['name', 'email', 'writingLevel', 'manuscriptCap'].forEach((attribute, index) => {
  	if (attribute in req.body) {
	  	columns.push(attribute);
	  	values.push(req.body[attribute]);
	  }
  })

  const update_query = columns.map((col, i) => col + "='" + values[i] + "'").join(", ")
  const authorid = req.body.authorid;
  columns = columns.join(", ");

  try {
    const data = await authorModel.updateWithReturn('author', authorid, update_query, columns);
    res.status(200).json({ authors: data.rows });
  } catch (err) {
    res.status(200).json({ authors: err.stack });
  }
}

export const updateAuthorManuscripts = async (req, res) => {
  const { myManuscripts, myDrafts, masterManuscriptMatches } = req.body;
  // TO DO 
}

