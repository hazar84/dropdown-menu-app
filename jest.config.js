module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
    
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        '^@/(.*)$': '<rootDir>/src/$1'
    },
    
    transform: {
        '^.+\\.(ts|tsx)$': 'babel-jest',
    },
    
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    
    testMatch: [
        '<rootDir>/src/**/*.{test,spec}.{js,jsx,ts,tsx}'
    ],
    
    roots: ['<rootDir>/src'],
};
