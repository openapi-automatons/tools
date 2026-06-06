import {
  OpenapiMap,
  OpenapiParameter,
  OpenapiParameterCookie,
  OpenapiParameterHeader,
  OpenapiParameterPath,
  OpenapiParameterQuery,
  OpenapiParameterQueryString,
  OpenapiPathMedia,
  OpenapiSchema,
} from '../types';
import {isRef} from './openapi';

export const hasSchema =
  (param: OpenapiParameter): param is OpenapiParameter & { schema: OpenapiSchema } =>
    Object.hasOwn(param, 'schema');
export const hasContent =
  (param: OpenapiParameter): param is OpenapiParameter & { content: OpenapiMap<OpenapiPathMedia> } =>
    Object.hasOwn(param, 'content');
export const isPathParam =
  (param: OpenapiParameter): param is OpenapiParameterPath => !isRef(param) && param.in === 'path';
export const isQueryParam =
  (param: OpenapiParameter): param is OpenapiParameterQuery => !isRef(param) && param.in === 'query';
export const isQueryStringParam =
  (param: OpenapiParameter): param is OpenapiParameterQueryString => !isRef(param) && param.in === 'querystring';
export const isHeaderParam =
  (param: OpenapiParameter): param is OpenapiParameterHeader => !isRef(param) && param.in === 'header';
export const isCookieParam =
  (param: OpenapiParameter): param is OpenapiParameterCookie => !isRef(param) && param.in === 'cookie';
