import { describe, expect, it } from 'vitest';
import { cn } from './utils';

describe('cn', () => {
  it('given several classes, when joined, then they are separated by single spaces', () => {
    expect(cn('flex', 'items-center')).toBe('flex items-center');
  });

  it('given conflicting Tailwind classes, when joined, then the last one wins', () => {
    expect(cn('px-2 py-1', 'px-4')).toBe('py-1 px-4');
  });

  it('given conditional and empty values, when joined, then only the truthy ones remain', () => {
    expect(
      cn('base', false && 'hidden', null, undefined, '', {
        active: true,
        disabled: false,
      }),
    ).toBe('base active');
  });
});
