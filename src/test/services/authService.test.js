import { describe, expect, it, jest } from '@jest/globals';
import bcrypt from "bcryptjs";
import AuthService from '../../services/authService.js';
import Usuario from '../../models/usuario.js';

const authService = new AuthService();

describe('Testando a authService.cadastrarUsuario', () => {

    it('Um usuário não pode ser cadastrado sem senha', async () => {
        // Arrange
        const usuarioMock = {
        nome: 'Fulado de tal',
        email: 'fulado@teste.com',
        };

        // Act
        const usuarioSalvo = authService.cadastrarUsuario(usuarioMock);

        // Assert
        await expect(usuarioSalvo).rejects.toThrowError('A senha de usuário é obrigatória!');
    });

    it('Um usuário não pode ser cadastrado sem email', () => {
        const usarioMockSemEmail = {
        nome: 'Fulado de tal',
        senha: '123456',
        };

        const usuarioSalvo = authService.cadastrarUsuario(usarioMockSemEmail);

        expect(usuarioSalvo).rejects.toThrowError('O email do usuário é obrigatório!');
    });

    it('Um usuário não pode ser cadastrado sem nome', () => {
        const usarioMockSemNome = {
        email: 'fulado@teste.com',
        senha: '123456',
        };

        const usuarioSalvo = authService.cadastrarUsuario(usarioMockSemNome);

        expect(usuarioSalvo).rejects.toThrowError('O nome do usuário é obrigatório!');
    });

    it('A senha do usuário precisa ser criptografada quando for salva no banco de dados', async () => {
        const data = {
            nome: "Fulano de tal",
            email: "fulado.detal@senha1.com",
            senha: "senha12345"
        }

        const usuario = await authService.cadastrarUsuario(data)
        expect(usuario.message).toEqual("usuario criado");

        const senhasIguais = await bcrypt.compare('senha12345', usuario.content.senha);

        expect(senhasIguais).toStrictEqual(true);

        await Usuario.excluir(usuario.content.id)
    })
});
