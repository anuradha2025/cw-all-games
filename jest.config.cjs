module.exports = {
    transform: {
        "^.+\\.(ts|tsx|js|jsx)$": "babel-jest",
    },
    transformIgnorePatterns: ["/node_modules/"],
    moduleNameMapper: {
        "\\.(css|less|scss)$": "identity-obj-proxy",
    },
    testEnvironment: "jsdom",
};