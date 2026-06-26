// Configuração do Metro (bundler do Expo/React Native).
//
// Correção necessária a partir do Expo SDK 53/54: o Metro passou a ativar
// "package exports" por padrão, e com isso o Firebase JS SDK carrega um build
// voltado a navegador — o que causa o erro:
//   "Component auth has not been registered yet"
// e o aviso de AsyncStorage. Desligar package exports e adicionar a extensão
// .cjs força o Metro a usar o build CommonJS compatível com React Native.
const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

config.resolver.sourceExts.push("cjs");
config.resolver.unstable_enablePackageExports = false;

module.exports = config;
