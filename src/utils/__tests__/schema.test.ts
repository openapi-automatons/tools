import {OpenapiSchema} from "../../types";
import {
  isSchemaAllOf,
  isSchemaArray,
  isSchemaBoolean,
  isSchemaInteger,
  isSchemaNumber,
  isSchemaObject, isSchemaOneOf, isSchemaRef,
  isSchemaString
} from "../schema";

it('should be detect string', () => {
  expect(isSchemaString({type: 'string'})).toBeTruthy();
});

it('should be detect number', () => {
  expect(isSchemaNumber({type: 'number'})).toBeTruthy();
});

it('should be detect integer', () => {
  expect(isSchemaInteger({type: 'integer'})).toBeTruthy();
});

it('should be detect boolean', () => {
  expect(isSchemaBoolean({type: 'boolean'})).toBeTruthy();
});

it('should be detect object', () => {
  expect(isSchemaObject({type: 'object'})).toBeTruthy();
  expect(isSchemaObject({properties: {}} as OpenapiSchema)).toBeTruthy();
});

it('should be detect array', () => {
  expect(isSchemaArray({type: 'array'})).toBeTruthy();
  expect(isSchemaArray({items: {}} as OpenapiSchema)).toBeTruthy();
});

it('should be detect allOf', () => {
  expect(isSchemaAllOf({allOf: []})).toBeTruthy();
});

it('should be detect oneOf', () => {
  expect(isSchemaOneOf({oneOf: []})).toBeTruthy();
});

it('should be detect ref', () => {
  expect(isSchemaRef({$ref: ''})).toBeTruthy();
});
