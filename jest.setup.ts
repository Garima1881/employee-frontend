
console.log('setupTests.ts loaded');
import '@testing-library/jest-dom/extend-expect'
import { TextEncoder } from 'util';
import { TextDecoder } from 'node:util'

global.TextEncoder = TextEncoder;
(global as any).TextDecoder = TextDecoder; 
const matchers = require('jest-extended');
expect.extend(matchers);

afterEach(() => {
  jest.useRealTimers();
});