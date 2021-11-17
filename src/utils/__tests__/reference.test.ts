import {referenceTitle} from '../reference';

describe('referenceTitle', () => {
  it('should be extract model', () => {
    expect(referenceTitle({$ref: '#/components/schemas/Pet'}))
      .toBe('Pet');
  });

  it('should be extract model for url', () => {
    const schema =
      {$ref: 'https://raw.githubusercontent.com/OAI/OpenAPI-Specification/main/examples/v3.0/petstore.yaml#'};
    expect(referenceTitle(schema))
      .toBe('petstore');
  });

  it('should be error for invalid format', () => {
    expect(() => referenceTitle({$ref: 'error'}))
      .toThrow('Invalid ref format: error\n  Can not extract name.');
  });
});

describe('referenceSchema', () => {
  // it('should be extract schema', () => {
  //   expect(referenceSchema({$ref: '#/components/Pet'},
  //     {openapi: petstore, settings: []}));
  // });
});
