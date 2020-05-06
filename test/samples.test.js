const request = require('supertest');
const { expect } = require('chai');
const app = require('../app');

/* 

  GET /api/samples/:shape

*/

describe('GET /api/samples/:shape', function () {
  this.timeout(10000);

  it('Should respond with the requested sample object', done => {
    const shape = 'heart';

    request(app)
      .get(`/api/samples/${shape}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const { result, sample } = res.body;

        expect(result).to.eql('ok');
        expect(sample).to.exist;
        expect(typeof sample).to.eql('object');

        done();
      });
  });

  it('If request sample that is not in the database, should get an error', done => {
    const shape = 'vanilla-coding';

    request(app)
      .get(`/api/samples/${shape}`)
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        const { result, message } = res.body;

        expect(result).to.eql('error');
        expect(message).to.eql('해당 샘플이 존재하지 않습니다.');

        done();
      });
  });
});
