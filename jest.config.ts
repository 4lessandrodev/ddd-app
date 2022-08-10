process.env.TZ = 'UTC';

export default {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "./../coverage",
  coverageProvider: "v8",
  preset: 'ts-jest',
  verbose: true,
  rootDir: './src',
  testEnvironment: 'node',
  testRegex: [".+\\.spec\\.ts$"],
  moduleNameMapper: {
		'@product/(.*)': '<rootDir>/modules/product/$1',
		'@types': '<rootDir>/types/index',
	},
};
