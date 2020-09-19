import { expect, server, BASE_URL } from './setup';

describe('Authors', () => {
  it('gets all authors', done => {
    server
      .get(`${BASE_URL}/authors`)
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.authors).to.be.instanceOf(Array);
        res.body.authors.forEach(m => {
          expect(m).to.have.property('authorid');
          expect(m).to.have.property('email');
          expect(m).to.have.property('modified_date');
          expect(m).to.have.property('created_date');
        });
        done();
      });
  });

  it('gets author by id', async () => {
    // Create an author
    const postdata = { email: 'new@name.com', password: 'password' }; 
    const author = await server.post(`${BASE_URL}/authors`).send(postdata)
    const authorid = author.body.authors[0].authorid

    server
      .get(`${BASE_URL}/authors/${authorid}`)
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.authors).to.be.instanceOf(Array);
        res.body.authors.forEach(m => {
          expect(m).to.have.property('authorid', authorid);
          expect(m).to.have.property('email', postdata.email);
          expect(m).to.have.property('created_date');
          expect(m).to.have.property('modified_date');
        });
      });
  });

  it('posts (creates) new author', done => {
    const postdata = { email: 'new2@name.com', password: 'password' }; 
    server
      .post(`${BASE_URL}/authors`)
      .send(postdata)
      .expect(201)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.authors).to.be.instanceOf(Array);
        res.body.authors.forEach(m => {
          expect(m).to.have.property('authorid');
          expect(m).to.have.property('email', postdata.email);
          expect(m).to.have.property('created_date');
          expect(m).to.have.property('modified_date');
        });
        done();
      });
  });

  it('incorrectly posts (creates) new author, no email', done => {
    const postdata = { name: 'something', password: 'password' }; 
    server
      .post(`${BASE_URL}/authors`)
      .send(postdata)
      .expect(400)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Missing email for authentication');
        done();
      });
  });

  it('incorrectly posts (creates) new author, no password', done => {
    const postdata = {email: 'something@something.com', name: 'name' }
    server
      .post(`${BASE_URL}/authors`)
      .send(postdata)
      .expect(400)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Missing password for authentication');
        done();
      });
  });

  it('incorrectly posts (creates) new author, bad email', done => {
    const postdata = { email: 'thisisabademail', password: 'password' };
    server
      .post(`${BASE_URL}/authors`)
      .send(postdata)
      .expect(400)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Please enter a valid email address');
        done();
      });
  });

  it('incorrectly posts (creates) new author with existing email', async () => {
    const postdata = { email: 'new@name.com', password: 'password' }; 
    const author = await server.post(`${BASE_URL}/authors`).send(postdata)

    server
      .post(`${BASE_URL}/authors`)
      .send(postdata)
      .expect(400)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('User with that EMAIL already exists');
      });
  });

  it('updates author preferences', async () => {
    const postdata = { email: 'new3@name.com', password: 'password' }; 
    const author = await server.post(`${BASE_URL}/authors`).send(postdata)
    const authorid = author.body.authors[0].authorid

    const data = { name: 'new name', writingLevel: 'professional', 'manuscriptCap': 10,
                 authorid: authorid };

    server
      .patch(`${BASE_URL}/authors`)
      .send(data)
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.authors).to.be.instanceOf(Array);
        res.body.authors.forEach(m => {
          expect(m).to.have.property('authorid');
          expect(m).to.have.property('name', data.name);
          // expect(m).to.have.property('email', data.email);
          expect(m).to.have.property('writinglevel', data.writingLevel);
          expect(m).to.have.property('manuscriptcap', data.manuscriptCap);
        });
      });
  });

});