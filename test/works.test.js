const request = require('supertest');
const { expect } = require('chai');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Work = require('../models/Work');
const app = require('../app');

/* 

  GET /api/works

*/

describe('GET /api/works', function () {
  this.timeout(10000);

  it('Should respond with the data for all the works', done => {
    request(app)
      .get('/api/works')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(async (err, res) => {
        if (err) return done(err);

        const { result, works } = res.body;
        const worksData = await Work.find();

        expect(result).to.eql('ok');
        expect(works).to.exist;
        expect(Array.isArray(works)).to.be.true;
        expect(works.length).to.eql(worksData.length);

        done();
      });
  });
});

/* 

  GET /api/works/:work_id

*/

describe('GET /api/works/:work_id', function () {
  this.timeout(10000);

  describe('Request valid work', function () {
    let userId;
    let workId;

    const mockWork = {
      creator: userId,
      created: new Date(),
      thumbnail: 'data:image/png;base64,iVBORw0KGgoAAAA',
      cubes: [
        {
          color: 'rgba(0, 0, 0)',
          position: { x: 0, y: 0, z: 0 }
        }
      ]
    };

    const fetchMockWork = async () => {
      const hash = await bcrypt.hash('password123', 10);

      const user = await User.create({
        email: 'test@gmail.com',
        name: 'test',
        password: hash
      });
      userId = user._id;
      mockWork.creator = user._id;

      const work = await Work.create(mockWork);
      workId = work._id;
    };

    const deleteMockWork = async () => {
      await User.deleteOne({ _id: userId });
      await Work.deleteOne({ _id: workId });
    };

    beforeEach(fetchMockWork);
    afterEach(deleteMockWork);

    it('Should respond with the work data', done => {
      request(app)
        .get(`/api/works/${workId}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);

          const { result, work } = res.body;

          expect(result).to.eql('ok');
          expect(work).to.exist;
          expect(work._id).to.eql(String(workId));
          expect(work.creator).to.eql(String(userId));
          expect(Array.isArray(work.cubes)).to.be.true;

          done();
        });
    });
  });

  describe('Request invalid work', function () {
    const workId = 'invalid-id';

    it('Request an invalid work should result in an error', done => {
      request(app)
        .get(`/api/works/${workId}`)
        .expect('Content-Type', /json/)
        .expect(500)
        .end((err, res) => {
          if (err) return done(err);

          const { result, message } = res.body;

          expect(result).to.eql('error');
          expect(message).to.eql('서버 에러가 발생했습니다. 다시 시도해 주세요.');

          done();
        });
    });
  });
});
