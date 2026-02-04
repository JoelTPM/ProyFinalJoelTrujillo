import { describe, it, expect } from 'vitest';
import { sum } from '../src/suma.js';

describe('sum', () => {
  it('suma dos números', () => {
    expect(sum(2, 3)).toBe(5);
  });
  it('suma de cero', () => {
    expect(sum(2, 0)).toBe(2);
  });
});
