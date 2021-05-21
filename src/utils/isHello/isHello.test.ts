import { isHello } from './isHello';

describe('isHello', (): void => {
  it('shoud return `true` when passed `Hello`', (): void => {
    expect(isHello('Hello')).toBe(true);
  });
  it('shoud return `false` when passed a different string', (): void => {
    expect(isHello('Hi')).toBe(false);
  });
});
