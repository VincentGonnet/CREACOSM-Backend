module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    testMatch: ['**/?(*.)+(spec|test).ts?(x)'],
    setupFilesAfterEnv: ["<rootDir>/src/tests/jest.setup.ts"],
};