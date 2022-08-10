process.env.TZ = 'UTC';

export default {
  clearMocks: true,
  collectCoverage: false,
  coverageProvider: "v8",
  preset: 'ts-jest',
  verbose: true,
  rootDir: './src',
  testEnvironment: 'node',
  testRegex: [".+\\.test\\.ts$"],
  moduleNameMapper: {
		'@product/(.*)': '<rootDir>/modules/product/$1',
		'@types': '<rootDir>/types/index',
	},
};
