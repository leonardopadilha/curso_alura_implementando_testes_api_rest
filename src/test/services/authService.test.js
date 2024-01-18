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
});
