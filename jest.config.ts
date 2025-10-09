/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from 'jest';

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/__tests__/**', '!src/**/index.ts'],
  preset: 'ts-jest',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        tsconfig: {
          jsx: 'react-jsx',
        },
        diagnostics: false,
      },
    ],
    '^.+\\.(js|jsx|mjs)$': [
      'ts-jest',
      {
        tsconfig: {
          jsx: 'react-jsx',
          allowJs: true,
        },
        diagnostics: false,
      },
    ],
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^.+\\.(css|scss|sass)$': '<rootDir>/__mocks__/styleMock.ts',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-markdown|remark-gfm|rehype-highlight|rehype-raw|unified|bail|is-plain-obj|trough|vfile|vfile-message|unist-.*|hast-.*|mdast-.*|micromark.*|decode-named-character-reference|character-entities|property-information|space-separated-tokens|comma-separated-tokens|trim-lines|devlop)/)',
  ],
  testEnvironment: 'jsdom',
};

export default config;
