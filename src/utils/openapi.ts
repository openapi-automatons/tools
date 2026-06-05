import {OpenapiReference} from '../types';

export const isRef = (schema: any): schema is OpenapiReference => Object.hasOwn(schema, '$ref');
