import {readFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {beforeEach, describe, expect, it, vi} from 'vitest';
import {fetch} from '../fetch';

vi.mock('node:fs/promises', () => ({readFile: vi.fn()}));
const mockReadFile = vi.mocked(readFile);

const mockFetch = vi.fn();
vi.stubGlobal('fetch', mockFetch);

const response = (body: string) => ({
  ok: true,
  status: 200,
  statusText: 'OK',
  text: () => Promise.resolve(body),
});

const resolveText = (body: string) => mockReadFile.mockResolvedValue(body as never);

describe('fetch', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should be fetch json file', async () => {
    resolveText('{"openapi": "3.0.3"}');
    expect(await fetch('test.json')).toEqual({openapi: '3.0.3'});
  });

  it('should be fetch yml file', async () => {
    resolveText('openapi: 3.0.3');
    expect(await fetch('test.yml')).toEqual({openapi: '3.0.3'});
  });

  it('should be throw error if unsupported file', async () => {
    resolveText('openapi: 3.0.3');
    await expect(() => fetch('test.txt')).rejects.toThrow('Unsupported file extension');
  });

  it('should be url file', async () => {
    mockFetch.mockResolvedValue(response('{"openapi": "3.0.3"}'));
    expect(await fetch('http://example.com/test.json')).toEqual({openapi: '3.0.3'});
    expect(mockFetch).toBeCalledWith('http://example.com/test.json');
  });

  it('should be nested file', async () => {
    resolveText('{"openapi": "3.0.3"}');
    expect(await fetch('./test.json', './openapi.json')).toEqual({openapi: '3.0.3'});
    expect(mockReadFile).toBeCalledWith(resolve(process.cwd(), 'test.json'), {encoding: 'utf-8'});
    expect(await fetch('../test.json', './test/openapi.json')).toEqual({openapi: '3.0.3'});
    expect(mockReadFile).toBeCalledWith(resolve(process.cwd(), 'test.json'), {encoding: 'utf-8'});
  });

  it('should be url nested file', async () => {
    mockFetch.mockResolvedValue(response('{"openapi": "3.0.3"}'));
    expect(await fetch('./test.json', 'http://example.com/openapi.json')).toEqual({openapi: '3.0.3'});
    expect(mockFetch).toBeCalledWith('http://example.com/test.json');
    expect(await fetch('../test.json', 'http://example.com/test/openapi.json')).toEqual({openapi: '3.0.3'});
    expect(mockFetch).toBeCalledWith('http://example.com/test.json');
  });

  it('should be nested url', async () => {
    resolveText('{"openapi": "3.0.3"}');
    mockFetch.mockResolvedValue(response('{"openapi": "3.0.3"}'));
    expect(await fetch('http://example.com/openapi.json', './openapi.json')).toEqual({openapi: '3.0.3'});
  });
});
