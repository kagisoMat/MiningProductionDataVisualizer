module.exports = {
    testEnvironment: 'jsdom',
    transform: {
      '^.+\\.(js|jsx)$': 'babel-jest',
    },
    transformIgnorePatterns: [
      '/node_modules/(?!axios)', // 👈 important: transform axios too!
    ],
    moduleFileExtensions: ['js', 'jsx'],
  };
  