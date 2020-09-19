import Model from '../models/model';
import Helper from './Helper';

const authorModel = new Model('authors');

function missingValuesMessage(email, password) {
  if (!email) {
    return ({'message': 'Missing email for authentication'});
  }

  if (!password) {
    return ({'message': 'Missing password for authentication'});
  }

  if (!Helper.isValidEmail(email)) {
    return ({ 'message': 'Please enter a valid email address' });
  }

  else {
    return 'No Error';
  }
}

export const loginLocal = async (req, res) => {
  const { email, password } = req.body;

  const missingValuesCheck = missingValuesMessage(email, password);
  if (missingValuesCheck !== 'No Error') {
    return res.status(400).send(missingValuesCheck)
  }

  try {
    const query = ` WHERE email = '${email}'`;
    const data = await authorModel.select('*', query);
    if (!data.rows[0]) {
      return res.status(400).send({'message': 'The credentials you provided is incorrect'});
    }
    // const hashPassword = Helper.hashPassword(data.rows[0].password);
    const hashPassword = data.rows[0].password;

    if(!Helper.comparePassword(hashPassword, password)) {
      return res.status(400).send({ 'message': 'The credentials you provided is incorrect' });
    }
    const token = Helper.generateToken(data.rows[0].email);

    // Don't return the password
    delete data.rows[0].password

    res.status(200).json({ authors: data.rows, token: token });
  } catch (err) {
    res.status(400).json({ err });
  }
}

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

export const createAuthor = async (req, res) => {
  const { email, password } = req.body;
  const missingValuesCheck = missingValuesMessage(email, password)
  if (missingValuesCheck !== 'No Error') {
    return res.status(400).send(missingValuesCheck)
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

  if ('email' in req.body) {
    // CANNOT PATCH EMAIL
    return res.status(400).send({ 'message': 'Cannot change email.' })
  }

  ['name', 'writingLevel', 'manuscriptCap'].forEach((attribute, index) => {
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

// I didn't test this yet...
export const deleteAuthor = async (req, res) => {
  const { authorid } = req.body
  try {
    const data = await authorModel.deleteFromTable('author', authorid);
    if(!data.rows[0]) {
      return res.status(404).send({'message': 'user not found'});
    }
    return res.status(204).send({ 'message': 'deleted' });
  } catch(error) {
    return res.status(400).send(error);
  }
}

