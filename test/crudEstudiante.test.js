import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { agregarEstudiante } from '../src/agregarEstudiante.js';
import { leerTodosLosEstudiantes } from '../src/leerEstudiante.js';
import { actualizarEstudiante } from '../src/actualizarEstudiante.js';
import { eliminarEstudiante } from '../src/eliminarEstudiante.js';

// Mock de fetch global
global.fetch = vi.fn();

describe('CRUD de Estudiantes', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });
  // ==================== TESTS DE AGREGAR ESTUDIANTE ====================
  describe('agregarEstudiante', () => {
    it('agregar un estudiante exitosamente', async () => {
      const nuevoEstudiante = {
        nombre: 'Juan Pérez',
        email: 'juan@example.com',
        telefono: '1234567890',
        carrera: 'Ingeniería en Sistemas'
      };
      const respuestaEsperada = {
        id: 1,
        ...nuevoEstudiante
      };
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => respuestaEsperada
      });
      const resultado = await agregarEstudiante(nuevoEstudiante);
      expect(resultado.success).toBe(true);
      expect(resultado.data).toEqual(respuestaEsperada);
      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/student',
        expect.objectContaining({ method: 'POST' })
      );
    });
  });
  // ==================== TESTS DE LEER TODOS LOS ESTUDIANTES ====================
  describe('leerTodosLosEstudiantes', () => {
    it('debe obtener todos los estudiantes', async () => {
      const estudiantesEsperados = [
        { id: 1, nombre: 'Juan', email: 'juan@example.com' },
        { id: 2, nombre: 'María', email: 'maria@example.com' }
      ];
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => estudiantesEsperados
      });
      const resultado = await leerTodosLosEstudiantes();
      expect(resultado.success).toBe(true);
      expect(resultado.data).toEqual(estudiantesEsperados);
      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/student',
        expect.objectContaining({ method: 'GET' })
      );
    });
  });
  // ==================== TESTS DE ACTUALIZAR ESTUDIANTE ====================
  describe('actualizarEstudiante', () => {
    it('debe actualizar un estudiante exitosamente', async () => {
      const datosActualizados = {
        nombre: 'Juan Pérez Actualizado',
        email: 'juan.nuevo@example.com'
      };
      const respuestaEsperada = {
        id: 1,
        ...datosActualizados
      };
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => respuestaEsperada
      });
      const resultado = await actualizarEstudiante(1, datosActualizados);
      expect(resultado.success).toBe(true);
      expect(resultado.data).toEqual(respuestaEsperada);
      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/student/1',
        expect.objectContaining({ method: 'PUT' })
      );
    });
  });
  // ==================== TESTS DE ELIMINAR ESTUDIANTE ====================
  describe('eliminarEstudiante', () => {
    it('eliminar un estudiante exitosamente', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        status: 204
      });
      const resultado = await eliminarEstudiante(1);
      expect(resultado.success).toBe(true);
      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/student/1',
        expect.objectContaining({ method: 'DELETE' })
      );
    });
  });
});
