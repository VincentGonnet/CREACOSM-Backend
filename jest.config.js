module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    reporters: [
        "<rootDir>/src/tests/jest.reporter.js"
    ],
    testMatch: ['**/?(*.)+(spec|test).ts?(x)'],
    setupFilesAfterEnv: ["<rootDir>/src/tests/jest.setup.ts"],
};