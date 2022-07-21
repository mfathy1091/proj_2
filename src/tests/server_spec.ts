import supertest from 'supertest'
import app from '../server'

// create a request object
const request = supertest(app);

describe('Test the root server endpoint', () => {
    it('get the / endpoint', async () => {
        const res = await request.get('/');
        expect(res.status).toBe(200);
    })
})