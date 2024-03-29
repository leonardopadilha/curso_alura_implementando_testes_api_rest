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

    it('O login deve validar se o usuário está cadastrado', async () => {
        const userMock = {
            email: 'novo_email@email.com',
            senha: '321senha'
        }

        await request(app)
                .post('/login')
                .set('Accept', 'application/json')  
                .send(userMock)
                .expect(500)
                .expect('"Usuario não cadastrado."')
    });

    it('O login deve validar e-mail e senha incorretos', async () => {
        const userMock = {
            email: 'fulado.detal@teste.com',
            senha: '123senha',
        };

        await request(app)
                .post('/login')
                .set('Accept', 'application/json')
                .send(userMock)
                .expect(500)
                .expect('"Usuario ou senha invalido."')
        
    })
    it('O login deve validar se está sendo retornado um accessToken', async () => {
        const loginMock = {
            email: 'raphael@teste.com.br',
            senha: '123456'
        }

        const resposta = await request(app)
                                    .post('/login')
                                    .set('Accept', 'application/json')
                                    .send(loginMock)
                                    .expect(201);
        
        expect(resposta.body.message).toBe('Usuario conectado')
        expect(resposta.body).toHaveProperty("accessToken");
    })
})