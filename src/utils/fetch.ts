import {readFile} from 'fs-extra';
import {load} from 'js-yaml';
import nodeFetch from 'node-fetch';
import {dirname, extname, resolve} from 'path';
import {parse as parseUrl} from 'url';
import {Openapi} from '../types';
import {isUrl} from './url';

export const fetch = async <T extends Object = Openapi>(url: string, openapiPath?: string): Promise<T> =>
  parse(await (isUrl(url) ?
    await nodeFetch(url).then(({text}) => text()) :
    openapiPath ?
      isUrl(openapiPath) ?
        await nodeFetch(urlJoin(openapiPath, url)).then(({text}) => text()) :
        readFile(resolve(extname(openapiPath) ?
          dirname(openapiPath) : openapiPath, url), {encoding: 'utf-8'}) :
      readFile(resolve(url), {encoding: 'utf-8'})), url);

const urlJoin = (base: string, path: string) => {
  const url = parseUrl(base);
  return `${url.protocol}//${url.host}${resolve(dirname(url.pathname ?? ''), path)}`;
};

const parse = <T extends object = Openapi>(data: string, filePath: string): T => {
  switch (extname(filePath)) {
    case '.json':
      return JSON.parse(data);
    case '.yml':
    case '.yaml':
      const yaml = load(data);
      if (typeof yaml === 'object') {
        return yaml as T;
      }
      throw new Error('Unsupported file format');
    default:
      throw new Error('Unsupported file extension');
  }
};
