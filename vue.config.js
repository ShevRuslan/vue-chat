module.exports = {
  devServer: {
    proxy: 'http://localhost:3001'
  },

  pluginOptions: {
    quasar: {
      importStrategy: 'kebab',
      rtlSupport: true
    }
  },

  transpileDependencies: ['quasar']
};
