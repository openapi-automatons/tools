import {readFile} from 'node:fs/promises';
import {dirname, extname, resolve} from 'node:path';
import {load} from 'js-yaml';
import {Openapi} from '../types';
import {isUrl} from './url';

export const fetch = async <T = Openapi>(url: string, openapiPath?: string): Promise<T> =>
  parse(await read(url, openapiPath), url);

const read = async (url: string, openapiPath?: string): Promise<string> => {
  if (isUrl(url)) {
    return fetchText(url);
  }
  if (openapiPath && isUrl(openapiPath)) {
    return fetchText(new URL(url, openapiPath).toString());
  }
  const base = openapiPath ? (extname(openapiPath) ? dirname(openapiPath) : openapiPath) : '';
  return readFile(resolve(base, url), {encoding: 'utf-8'});
};

const fetchText = async (url: string): Promise<string> => {
  const response = await globalThis.fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
  }
  return response.text();
};

const parse = <T = Openapi>(data: string, filePath: string): T => {
  switch (extname(filePath)) {
    case '.json':
      return JSON.parse(data);
    case '.yml':
    case '.yaml': {
      const yaml = load(data);
      if (typeof yaml === 'object') {
        return yaml as T;
      }
      throw new Error('Unsupported file format');
    }
    default:
      throw new Error('Unsupported file extension');
  }
};
