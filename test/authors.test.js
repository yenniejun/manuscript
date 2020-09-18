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
          expect(m).to.have.property('name');
          expect(m).to.have.property('email');
          expect(m).to.have.property('writinglevel');
          expect(m).to.have.property('manuscriptcap');
          expect(m).to.have.property('mymanuscripts');
        });
        done();
      });
  });

  it('gets author by id', async () => {
    // Create an author
    const data = { name: 'some name', email: 'new@name.come',
                 writingLevel: 'amateur', 'manuscriptCap': 3 };  
    const author = await server.post(`${BASE_URL}/authors`).send(data)
    const authorid = author.body.authors[0].authorid

    server
      .get(`${BASE_URL}/authors/${authorid}`)
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.authors).to.be.instanceOf(Array);
        res.body.authors.forEach(m => {
          expect(m).to.have.property('authorid', authorid);
          expect(m).to.have.property('name', data.name);
          expect(m).to.have.property('email', data.email);
          expect(m).to.have.property('writinglevel', data.writingLevel);
          expect(m).to.have.property('manuscriptcap', data.manuscriptCap);
          expect(m).to.have.property('mymanuscripts');
        });
      });
  });

  it('posts (creates) new author', done => {
    const data = { name: 'some name', email: 'new@name.come',
                 writingLevel: 'amateur', 'manuscriptCap': 3 };
    server
      .post(`${BASE_URL}/authors`)
      .send(data)
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.authors).to.be.instanceOf(Array);
        res.body.authors.forEach(m => {
          expect(m).to.have.property('authorid');
          expect(m).to.have.property('name', data.name);
          expect(m).to.have.property('email', data.email);
          expect(m).to.have.property('writinglevel', data.writingLevel);
          expect(m).to.have.property('manuscriptcap', data.manuscriptCap);
        });
        done();
      });
  });

  it('updates author preferences', async () => {
    const authordata = { name: 'some name', email: 'new@name.come',
                 writingLevel: 'amateur', 'manuscriptCap': 3 };  
    const author = await server.post(`${BASE_URL}/authors`).send(authordata)
    const authorid = author.body.authors[0].authorid

    const data = { name: 'new name', email: 'better@email.come',
                 writingLevel: 'professional', 'manuscriptCap': 10,
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
          expect(m).to.have.property('email', data.email);
          expect(m).to.have.property('writinglevel', data.writingLevel);
          expect(m).to.have.property('manuscriptcap', data.manuscriptCap);
        });
      });
  });


});