import { expect, server, BASE_URL } from './setup';

describe('Authors', () => {
  it('get authors page', done => {
    server
      .get(`${BASE_URL}/authors`)
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.authors).to.be.instanceOf(Array);
        res.body.authors.forEach(m => {
          expect(m).to.have.property('name');
          expect(m).to.have.property('mymanuscripts');
        });
        done();
      });
  });

  it('posts (creates) new authors', done => {
    const data = { name: 'some name', email: 'new@name.come',
                 writingLevel: 'amateur', 'manuscriptCap': 3 };
    console.log(data.writingLevel);
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
});