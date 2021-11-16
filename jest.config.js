module.exports = {
  setupFilesAfterEnv: ['<rootDir>/__tests__/setup.js'],
  testPathIgnorePatterns: ['setup.js', 'utils'],
  modulePaths: ['node_modules', '<rootDir>'],
  moduleNameMapper: {
    '@/typechain': '<rootDir>/typechain',
    '@/pages': '<rootDir>/pages',
    '@/components': '<rootDir>/components',
    '@/components/(.*)': '<rootDir>/components/$1',
  },
  modulePathIgnorePatterns: ['<rootDir>/web3'],
};
