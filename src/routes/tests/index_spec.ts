import supertest from 'supertest';
import app from '../../server';

const request = supertest(app);

describe('Testing not exitent endpoint', () => {

    it('returns 404 if endpoint is not existing', async () => {
        const res = await request.post('/api/wrong_endpoint');
        expect(res.status).toBe(404);
    });

});
