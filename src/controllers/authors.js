import Model from '../models/model';
import Helper from './Helper';


const authorModel = new Model('authors');

export const getAuthors = async (req, res) => {
  try {
    const data = await authorModel.select('authorid, name, email, \
      created_date, modified_date, writingLevel, manuscriptCap, myManuscripts');
    res.status(200).json({ authors: data.rows });
  } catch (err) {
    res.status(400).json({ err });
  }
};

export const getAuthor = async (req, res) => {
  try {
    const query = ` WHERE authorid = '${req.params.id}'`;
    const data = await authorModel.select(['authorid, name, email, \
      created_date, modified_date, writingLevel, manuscriptCap, myManuscripts'], query);
    res.status(200).json({ authors: data.rows });
  } catch (err) {
    res.status(400).json({ err });
  }
};

export const addAuthor = async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).send({'message': 'Missing email for authentication'});
  }

  if (!password) {
    return res.status(400).send({'message': 'Missing password for authentication'});
  }

  if (!Helper.isValidEmail(req.body.email)) {
    return res.status(400).send({ 'message': 'Please enter a valid email address' });
  }

  const hashPassword = Helper.hashPassword(password);

  const columns = 'email, password, created_date, modified_date';
  const values = `'${email}', '${hashPassword}', 'now()', 'now()'`;

  try {
    const data = await authorModel.insertWithReturn('author', columns, values);
    const token = Helper.generateToken(data.rows[0].email);
    res.status(201).json({ authors: data.rows, token: token });
  } catch (error) {
    if (error.routine === '_bt_check_unique') {
      return res.status(400).send({ 'message': 'User with that EMAIL already exists' })
    }
    return res.status(400).send(error);
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

  columns.push('modified_date');
  values.push(`now()`)

  const update_query = columns.map((col, i) => col + "='" + values[i] + "'").join(", ")
  const authorid = req.body.authorid;
  columns = columns.join(", ");

  try {
    const data = await authorModel.updateWithReturn('author', authorid, update_query, columns);
    res.status(200).json({ authors: data.rows });
  } catch (err) {
    res.status(400).json({ err });
  }
}

export const updateAuthorManuscripts = async (req, res) => {
  const { myManuscripts, myDrafts, masterManuscriptMatches } = req.body;
  // TO DO 
}

