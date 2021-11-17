import {isRef} from '../openapi';

describe('isRef', () => {
  it('should be detect ref', () => {
    expect(isRef({})).toBeFalsy();
    expect(isRef({$ref: ''})).toBeTruthy();
  });
});
