import { beforeEach, afterEach, describe, expect, it, jest } from '@jest/globals';

import request from 'supertest';

import app from '../../app';

let servidor;
beforeEach(() => {
    const porta = 3000;
    servidor = app.listen(porta);
});

afterEach(() => {
    servidor.close();
});

describe('Testando a roda login (POST)', () => {
    it('O login deve possuir um email e senha para se autenticar', async () => {
        const loginMock = {
            email: 'teste@teste.com.br'
        }

        await request(servidor)
                    .post('/login')
                    .send(loginMock)
                    .expect(500)
                    .expect('"A senha de usuario é obrigatório."')
    })
})