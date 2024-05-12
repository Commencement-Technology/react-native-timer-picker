/* eslint-disable @typescript-eslint/no-var-requires */
const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

const config = getDefaultConfig(__dirname);

config.transformer.getTransformOptions = async () => ({
    transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
    },
});

const extraNodeModules = {
    "react-native-timer-picker": path.resolve(__dirname, "../src"),
};

config.resolver.extraNodeModules = new Proxy(extraNodeModules, {
    get: (target, name) =>
        // redirects dependencies referenced from src/ to local node_modules
        name in target
            ? target[name]
            : path.join(process.cwd(), `node_modules/${name}`),
});

config.watchFolders = [path.resolve(__dirname, "../src")];

module.exports = config;
