import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { agregarUsuario } from '../src/agregarUsuario.js';
import { leerTodosLosUsuarios } from '../src/leerUsuario.js';
import { actualizarUsuario } from '../src/actualizarUsuario.js';
import { eliminarUsuario } from '../src/eliminarUsuario.js';

// Mock de fetch global
global.fetch = vi.fn();

describe('CRUD de Usuarios', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });
  // ==================== TESTS DE AGREGAR USUARIO ====================
  describe('agregarUsuario', () => {
    it('debe agregar un usuario exitosamente', async () => {
      const nuevoUsuario = {
        username: 'jdoe',
        email: 'john@example.com',
        password: 'password123',
        role: 'user'
      };
      const respuestaEsperada = {
        _id: '507f1f77bcf86cd799439011',
        ...nuevoUsuario
      };
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => respuestaEsperada
      });
      const resultado = await agregarUsuario(nuevoUsuario);
      expect(resultado.success).toBe(true);
      expect(resultado.data).toEqual(respuestaEsperada);
      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/user',
        expect.objectContaining({ method: 'POST' })
      );
    });
  });
  // ==================== TESTS DE LEER TODOS LOS USUARIOS ====================
  describe('leerTodosLosUsuarios', () => {
    it('debe obtener todos los usuarios', async () => {
      const usuariosEsperados = [
        { _id: '1', username: 'jdoe', email: 'john@example.com', role: 'user' },
        { _id: '2', username: 'mgarcia', email: 'maria@example.com', role: 'admin' }
      ];
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => usuariosEsperados
      });
      const resultado = await leerTodosLosUsuarios();
      expect(resultado.success).toBe(true);
      expect(resultado.data).toEqual(usuariosEsperados);
      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/user',
        expect.objectContaining({ method: 'GET' })
      );
    });
  });
  // ==================== TESTS DE ACTUALIZAR USUARIO ====================
  describe('actualizarUsuario', () => {
    it('debe actualizar un usuario exitosamente', async () => {
      const datosActualizados = {
        username: 'jdoe_updated',
        email: 'john.updated@example.com'
      };
      const respuestaEsperada = {
        _id: '507f1f77bcf86cd799439011',
        ...datosActualizados
      };
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => respuestaEsperada
      });
      const resultado = await actualizarUsuario('507f1f77bcf86cd799439011', datosActualizados);
      expect(resultado.success).toBe(true);
      expect(resultado.data).toEqual(respuestaEsperada);
      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/user/507f1f77bcf86cd799439011',
        expect.objectContaining({ method: 'PUT' })
      );
    });
  });
  // ==================== TESTS DE ELIMINAR USUARIO ====================
  describe('eliminarUsuario', () => {
    it('debe eliminar un usuario exitosamente', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        status: 204
      });
      const resultado = await eliminarUsuario('507f1f77bcf86cd799439011');
      expect(resultado.success).toBe(true);
      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/user/507f1f77bcf86cd799439011',
        expect.objectContaining({ method: 'DELETE' })
      );
    });
  });
});