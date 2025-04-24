module.exports = function (api) {
  api.cache(true);
  const plugins = [];

  return {
    presets: ['nativewind/babel', ['babel-preset-expo', { jsxImportSource: 'nativewind' }]],

    plugins,
  };
};
