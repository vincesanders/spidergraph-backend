const request = require('supertest');
const server = require('./server.js');
const db = require('./data/dbConfig');

beforeAll( async () => {
    await db('data').truncate()
    await db('layers').truncate()
    await db('axes').truncate()
    await db('graphs').truncate()
    await db('users').truncate()
})
let token;
describe('Auth Endpoints',() => {
    describe('POST /register',() => {
        it('returns a status of 201', () => {
            return request(server)
            .post('/api/auth/register')
            .send({username:'test1',password:'pass',email:'test1@email.com'})
            .then(res => {
                expect(res.status).toBe(201);
            });
        })
        it('cannot create duplicate account', () => {
            return request(server)
            .post('/api/auth/register')
            .send({username:'test1',password:'pass',email:'test1@email.com'})
            .then(res => {
                expect(res.status).toBe(400);
                expect(res.body.message).toBe('Account with that username or email already exists.');
            });
        })
    })
    describe('POST /login',() => {
        it('returns a status of 201', () => {
            return request(server)
            .post('/api/auth/login')
            .send({username:'test1',password:'pass'})
            .then(res => {
                expect(res.status).toBe(201);
                token = res.body.token;
            });
        })
        it('cannot login to uncreated account', () => {
            return request(server)
            .post('/api/auth/login')
            .send({username:'test2',password:'pass'})
            .then(res => {
                expect(res.status).toBe(500);
            });
        })
    })
})
describe('Users Endpoints',() => {
    describe('GET /',() => {
        it('requires a valid token', () => {
            return request(server)
            .get('/api/users/')
            .then(res => {
                expect(res.status).toBe(401);
            });
        })
        it('returns a list of users', () => {
            return request(server)
            .get('/api/users/')
            .set('token',token)
            .then(res => {
                expect(res.status).toBe(200);
                expect(res.body[0].id).toBe(1);
            });
        })
    })
    describe('GET /:id',() => {
        it('requires a valid token', () => {
            return request(server)
            .get('/api/users/1')
            .then(res => {
                expect(res.status).toBe(401);
            });
        })
        it('returns a single user', () => {
            return request(server)
            .get('/api/users/1')
            .set('token',token)
            .then(res => {
                expect(res.status).toBe(200);
                expect(res.body.id).toBe(1);
            });
        })
    })
})
const graph1 = {
    name: 'Test1',
    owner: 1,
    theme: 1,
    axis: ['a1','a2','a3','a4'],
    layer: ['l1','l2','l3','l4'],
    data: [
        [11,12,13,14],
        [21,22,23,24],
        [31,32,33,34],
        [41,42,43,44]
    ]
}
const graph2 = {
    name: 'Test2',
    owner: 1,
    theme: 1,
    axis: ['a4','a3','a2','a1'],
    layer: ['l1','l2','l3','l4'],
    data: [
        [41,42,43,44],
        [31,32,33,34],
        [21,22,23,24],
        [11,12,13,14]
    ]
}
describe('Graphs Endpoints',() => {
    describe('POST /',() => {
        it('requires a proper graph', () => {
            return request(server)
            .post('/api/graphs/')
            .set('token',token)
            .then(res => {
                expect(res.status).toBe(400);
            });
        })
        it('creates the new graph', () => {
            return request(server)
            .post('/api/graphs/')
            .set('token',token)
            .send(graph1)
            .then(res => {
                expect(res.status).toBe(201);
            });
        })
    })
    describe('GET /:id',() => {
        it('handles no graph', () => {
            return request(server)
            .get('/api/graphs/4')
            .set('token',token)
            .then(res => {
                expect(res.status).toBe(400);
                expect(res.body.message).toBe('No data for that id');
            });
        })
        it('returns graph:id', () => {
            return request(server)
            .get('/api/graphs/1')
            .set('token',token)
            .then(res => {
                expect(res.status).toBe(200);
                expect(res.body.id).toBe(1);
            });
        })
    })
    describe('PUT /:id',() => {
        it('requires a proper graph', () => {
            return request(server)
            .put('/api/graphs/1')
            .set('token',token)
            .then(res => {
                expect(res.status).toBe(400);
            });
        })
        it('updates the graph', () => {
            return request(server)
            .put('/api/graphs/1')
            .set('token',token)
            .send(graph2)
            .then(res => {
                expect(res.status).toBe(201);
                expect(res.body.name).toBe('Test2')
            });
        })
    })
    describe('*** GET /users/:id/graphs ***',() => {
        it('returns empty if user has no graphs', () => {
            return request(server)
            .get('/api/users/2/graphs/')
            .set('token',token)
            .then(res => {
                expect(res.status).toBe(200);
                expect(res.body.length).toBe(0);
            });
        })
        it('returns users graphs', () => {
            return request(server)
            .get('/api/users/1/graphs/')
            .set('token',token)
            .then(res => {
                expect(res.status).toBe(200);
                expect(res.body[0].id).toBe(1);
            });
        })
    })
    describe('DELETE /:id',() => {
        it('handles no graph to remove', () => {
            return request(server)
            .delete('/api/graphs/2')
            .set('token',token)
            .then(res => {
                expect(res.status).toBe(500);
                expect(res.body.message).toBe("Could not remove graph")
            });
        })
        it('removes target graph', () => {
            return request(server)
            .delete('/api/graphs/1')
            .set('token',token)
            .then(res => {
                expect(res.status).toBe(200);
                expect(res.body.message).toBe("Graph 1 removed.")
            });
        })
    })
})